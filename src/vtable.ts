import * as Vue from "vue";
import { CssProperties } from "vue-css-definition";
import { VtableListCtx, VtableProps, VtableEvents, RowClickEventArgs, ScrollEventArgs } from "../types";
import * as _ from "lodash";
import { px, supplier } from "./utils";
import * as tc from "vue-typed-component";
import vlist from "./vlist";
import vtablerow from "./vtablerow";
import vtablesplitter from "./vtablesplitter";
import { positive } from "./validation";

interface VtableData {
    widths: number[];
    scrollLeft: number;
    splitterPositions: number[];
    draggingSplitter: number;
}

@tc.component<VtableProps<T>, Vtable<T>>({
    ...require("./vtable.pug"),
    components: { vlist, vtablerow, vtablesplitter },
    props: {
        rowHeight: { type: Number, required: true, validator: positive },
        headerHeight: { type: Number, default: 0 },
        columns: { type: Array, required: true },
        items: { type: Array, required: true },
        rowStyleCycle: { type: Number, default: 1, validator: positive },
        splitterWidth: { type: Number, default: 3, validator: positive },
        rowClass: { type: String, default: "vtable-row" },
        getRowClass: { type: Function, default: supplier(() => undefined) },
        ctx: {},
        getItemKey: { type: Function, required: true }
    },
})
export default class Vtable<T> extends tc.StatefulEvTypedComponent<VtableProps<T>, VtableEvents<T>, VtableData> {
    $refs: { header: Element };
    data(): VtableData {
        return {
            widths: this.$props.columns.map(c => c.defaultWidth),
            scrollLeft: 0,
            splitterPositions: [],
            draggingSplitter: -1
        };
    }

    /* style */
    get headerStyle(): CssProperties {
        return {
            display: "flex",
            position: "relative",
            flex: "1 1 auto",
            width: "100%",
            height: px(this.actualHeaderHeight),
            lineHeight: px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: "0",
            whiteSpace: "none"
        };
    }
    headerCellStyle(width: number): CssProperties {
        return {
            minWidth: px(width),
            width: px(width),
            lineHeight: px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: "0",
            overflow: "hidden"
        };
    }
    /** ctx object will be passed to vlist */
    get listCtx(): VtableListCtx<T> {
        const { ctx, rowClass, columns, getRowClass, splitterWidth } = this.$props;
        return {
            ctx,
            columns,
            getRowClass: (item, index) => (getRowClass(item, index) || rowClass),
            splitterWidth,
            widths: this.$data.widths,
            draggingSplitter: this.$data.draggingSplitter,
            onSplitterMouseDown: this.onSplitterMouseDown
        };
    }
    get actualHeaderHeight(): number {
        const { headerHeight, rowHeight } = this.$props;
        return (headerHeight > 0) ? headerHeight : rowHeight;
    }
    get contentWidth() {
        return _.sumBy(this.$data.widths, w => w + this.$props.splitterWidth);
    }

    /* methods */
    updateScrollPosition(args: ScrollEventArgs) {
        this.$data.scrollLeft = args.scrollLeft;
    }
    onSplitterMouseDown(index: number, event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        const headerCell = this.$refs.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.$props.columns[index];
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
    onRowClick(arg: RowClickEventArgs<T>) {
        this.$events.emit("row-click", arg);
    }
}
