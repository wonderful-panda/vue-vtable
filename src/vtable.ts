import * as Vue from "vue";
import { StyleObject, VtableColumn, VtableListCtx } from "../types";
import * as _ from "lodash";
import { px } from "./utils";
import { component, prop as p } from "vueit";
import vlist from "./vlist";
import { ScrollEventArgs } from "./vlist";
import vtablerow from "./vtablerow";
import vtablesplitter from "./vtablesplitter";
import { positive } from "./validation";

interface VtableProps {
    rowHeight: number;
    headerHeight?: number;
    columns: VtableColumn[];
    items: any[];
    rowStyleCycle?: number;
    splitterWidth?: number;
    rowClass?: string;
    getRowClass?: (item: any, index: number) => string;
    ctx?: any;
    getItemKey: (item: any) => number | string;
}

interface VtableData {
    widths: number[];
    scrollLeft: number;
    splitterPositions: number[];
    draggingSplitter: number;
}

@component<Vtable>({
    compiledTemplate: require("./vtable.pug"),
    components: { vlist, vtablerow, vtablesplitter },
    data(): VtableData {
        return {
            widths: this.columns.map(c => c.defaultWidth),
            scrollLeft: 0,
            splitterPositions: [],
            draggingSplitter: -1
        };
    }
})
export default class Vtable extends Vue implements VtableProps {
    $data: VtableData;
    $refs: { header: Element };

    @p.required({ validator: positive }) rowHeight: number;
    @p.default(0) headerHeight?: number;
    @p.required columns: VtableColumn[];
    @p.required items: any[];
    @p.default(1, { validator: positive }) rowStyleCycle?: number;
    @p.default(3, { validator: positive }) splitterWidth?: number;
    @p.default("vtable-row") rowClass?: string;
    @p getRowClass?: (item: any, index: number) => string;
    @p ctx?: any;
    @p.required getItemKey: (item: any) => number | string;

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
