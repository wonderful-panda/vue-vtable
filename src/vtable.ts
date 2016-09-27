import * as Vue from "vue";
import * as _ from "lodash";
import { px } from "./utils";
import { VueComponent, Prop } from "vue-typescript";
import vlist from "./vlist";
import { ScrollEventArgs } from "./vlist";
import vtablerow from "./vtablerow";
import vtablesplitter from "./vtablesplitter";

@VueComponent({
    template: require("./vtable.pug"),
    components: { vlist, vtablerow, vtablesplitter }
})
export default class Vtable extends Vue {
    $els: { header: HTMLElement };

    /* props */
    @Prop({ required: true, validator: v => v > 0 }) rowHeight: number;
    @Prop headerHeight: number = 0;
    @Prop({ required: true }) columns: VtableColumn[];
    @Prop({ required: true }) items: any[];
    @Prop({ default: 1, validator: v => v > 0 }) rowStyleCycle: number;
    @Prop({ default: 3, validator: v => v > 0 }) splitterWidth: number;
    @Prop rowClass: string = "vtable-row";
    @Prop getRowClass: (item: any, index: number) => string;
    @Prop ctx: any;
    @Prop rowTrackBy: string = "$index";

    /* data */
    widths: number[] = [];
    scrollLeft: number = 0;
    splitterPositions: number[] = [];
    draggingSplitter: number = -1;

    ready() {
        this.widths = this.columns.map(c => c.defaultWidth);
    }

    /* style */
    get containerStyle(): StyleObject {
        return {
            display: "flex",
            position: "relative",
            margin: 0,
            padding: 0,
            overflow: "hidden"
        };
    }
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
            widths: this.widths,
            draggingSplitter: this.draggingSplitter,
            onSplitterMouseDown: this.onSplitterMouseDown
        };
    }
    get actualHeaderHeight() {
        return this.headerHeight > 0 ? this.headerHeight : this.rowHeight;
    }
    get contentWidth() {
        return _.sumBy(this.widths, w => w + this.splitterWidth);
    }

    /* methods */
    updateScrollPosition(args: ScrollEventArgs) {
        this.scrollLeft = args.scrollLeft;
    }
    onSplitterMouseDown(index: number, event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        const headerCell = this.$els.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.columns[index];
        const startWidth = headerCell.clientWidth;
        const startX = event.screenX;
        const minWidth = column.minWidth || 5;
        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const offset = e.screenX - startX;
            const width = Math.max(startWidth + offset, minWidth);
            this.widths.$set(index, width);
            this.draggingSplitter = index;
        };
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            this.draggingSplitter = -1;
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        this.draggingSplitter = index;
    }
}
