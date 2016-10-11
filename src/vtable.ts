import * as Vue from "vue";
import { StyleObject, VtableColumn, VtableListCtx } from "../types";
import * as _ from "lodash";
import { px } from "./utils";
import VueComponent from "vue-class-component";
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

const required = true;
const { render, staticRenderFns } = require("./vtable.pug");

type C = Vue & Vtable & VtableProps;

@VueComponent<C>({
    render,
    staticRenderFns,
    components: { vlist, vtablerow, vtablesplitter },
    props: {
        rowHeight: { type: Number, required, validator: positive },
        headerHeight: { type: Number, default: 0 },
        columns: { type: Array, required },
        items: { type: Array, required },
        rowStyleCycle: { type: Number, default: 1, validator: positive },
        splitterWidth: { type: Number, default: 3, validator: positive },
        rowClass: { type: String, default: "vtable-row" },
        getRowClass: { type: Function },
        ctx: {},
        getItemKey: { type: Function, required }
    },
    data(): VtableData {
        return {
            widths: this.columns.map(c => c.defaultWidth),
            scrollLeft: 0,
            splitterPositions: [],
            draggingSplitter: -1
        };
    }
})
export default class Vtable extends Vue {
    $data: VtableData;
    $refs: { header: Element };

    /* style */
    get headerStyle(this: C): StyleObject {
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
    headerCellStyle(this: C, width: number): StyleObject {
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
    get listCtx(this: C): VtableListCtx {
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
    get actualHeaderHeight(this: C) {
        return this.headerHeight > 0 ? this.headerHeight : this.rowHeight;
    }
    get contentWidth(this: C) {
        return _.sumBy(this.$data.widths, w => w + this.splitterWidth);
    }

    /* methods */
    updateScrollPosition(this: C, args: ScrollEventArgs) {
        this.$data.scrollLeft = args.scrollLeft;
    }
    onSplitterMouseDown(this: C, index: number, event: MouseEvent) {
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
    onRowClick(this: C, arg) {
        this.$emit("row-click", arg);
    }
}
