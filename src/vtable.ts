import * as Vue from "vue";
import * as _ from "lodash";
import { px } from "./utils";
import { component, prop, p, pr } from "vueit";
import vlist from "./vlist";
import { ScrollEventArgs } from "./vlist";
import vtablerow from "./vtablerow";
import vtablesplitter from "./vtablesplitter";

interface VtableData {
    widths: number[];
    scrollLeft: number;
    splitterPositions: number[];
    draggingSplitter: number;
}

@component({
    compiledTemplate: require("./vtable.pug"),
    components: { vlist, vtablerow, vtablesplitter }
})
export default class Vtable extends Vue {
    $data: VtableData;
    $refs: { header: Element };

    /* props */
    @prop({ required: true, validator: v => v > 0 }) rowHeight: number;
    @prop({ default: 0 }) headerHeight: number = 0;
    @pr columns: VtableColumn[];
    @pr items: any[];
    @prop({ default: 1, validator: v => v > 0 }) rowStyleCycle: number;
    @prop({ default: 3, validator: v => v > 0 }) splitterWidth: number;
    @p rowClass: string = "vtable-row";
    @p getRowClass: (item: any, index: number) => string;
    @p ctx: any;
    @pr getItemKey: (item: any) => number | string;

    /* data */
    data(): VtableData {
        return {
            widths: this.columns.map(c => c.defaultWidth),
            scrollLeft: 0,
            splitterPositions: [],
            draggingSplitter: -1
        };
    }

    /* style */
    get headerStyle(): StyleObject {
        return {
            display: "flex",
            position: "relative",
            flex: "1 1 auto",
            width: "100%",
            height: px(this.actualHeaderHeight),
            lineHeight: px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: 0,
            textWrap: "none"
        };
    }
    headerCellStyle(width: number): StyleObject {
        return {
            minWidth: px(width),
            width: px(width),
            lineHeight: px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: 0,
            overflow: "hidden"
        };
    }
    /** ctx object will be passed to vlist */
    get listCtx(): VtableListCtx {
        const rowClass = this.rowClass;
        return {
            ctx: this.ctx,
            columns: this.columns,
            getRowClass: this.getRowClass ? this.getRowClass : (item, index) => rowClass,
            splitterWidth: this.splitterWidth,
            widths: this.$data.widths,
            draggingSplitter: this.$data.draggingSplitter,
            onSplitterMouseDown: this.onSplitterMouseDown
        };
    }
    get actualHeaderHeight() {
        return this.headerHeight > 0 ? this.headerHeight : this.rowHeight;
    }
    get contentWidth() {
        return _.sumBy(this.$data.widths, w => w + this.splitterWidth);
    }

    /* methods */
    updateScrollPosition(args: ScrollEventArgs) {
        this.$data.scrollLeft = args.scrollLeft;
    }
    onSplitterMouseDown(index: number, event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        const headerCell = this.$refs.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.columns[index];
        const startWidth = headerCell.clientWidth;
        const startX = event.screenX;
        const minWidth = column.minWidth || 5;
        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const offset = e.screenX - startX;
            const width = Math.max(startWidth + offset, minWidth);
            Vue.set(this.$data.widths, index, width);
            this.$data.draggingSplitter = index;
        };
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            this.$data.draggingSplitter = -1;
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        this.$data.draggingSplitter = index;
    }
    onRowClick(arg) {
        this.$emit("row-click", arg);
    }
}
