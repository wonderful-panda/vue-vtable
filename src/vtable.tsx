import Vue from "vue";
import { CssProperties } from "vue-css-definition";
import { VtableListCtx, VtableProps, VtableEvents, RowEventArgs, ScrollEventArgs } from "../types";
import * as _ from "lodash";
import { px, supplier } from "./utils";
import * as tc from "vue-typed-component";
import * as p from "vue-typed-component/lib/props";
import Vlist from "./vlist";
import VtableRow from "./vtablerow";
import VtableSplitter from "./vtablesplitter";


interface VtableData {
    widths: number[];
    scrollLeft: number;
    splitterPositions: number[];
    draggingSplitter: number;
}

@tc.component<VtableProps<T>>({
    props: {
        rowHeight: p.Num.Required.$positive(),
        headerHeight: p.Num.$nonNegative(),
        columns: p.Arr.Required,
        items: p.Arr.Required,
        rowStyleCycle: p.Num.$positive(),
        splitterWidth: p.Num.$positive(),
        rowClass: p.Str,
        getRowClass: p.Func.Default(supplier(() => undefined)),
        ctx: p.Any,
        getItemKey: p.Func.Required
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
            getRowClass: getRowClass || ((item, index) => rowClass || "vtable-row"),
            splitterWidth: splitterWidth || 3,
            widths: this.$data.widths,
            draggingSplitter: this.$data.draggingSplitter,
            onSplitterMouseDown: this.onSplitterMouseDown
        };
    }
    get actualHeaderHeight(): number {
        const { headerHeight, rowHeight } = this.$props;
        return (headerHeight && headerHeight > 0) ? headerHeight : rowHeight;
    }
    get contentWidth() {
        const splitterWidth = this.$props.splitterWidth || 3;
        return _.sumBy(this.$data.widths, w => w + splitterWidth);
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
    onRowEvent(eventName: string, arg: RowEventArgs<T, Event>) {
        this.$events.emit("row" + eventName as any, arg);
    }
    get headerCells() {
        return this.$props.columns.map((c, index) => [
            <div staticClass="vtable-header-cell" class={ c.className } style={ this.headerCellStyle(this.listCtx.widths[index]) }>
              { c.title }
            </div>,
            <VtableSplitter index={ index } ctx={ this.listCtx } />
        ]);
    }
    render() {
        const VlistT = Vlist as (new () => Vlist<T>);
        const { rowHeight, items, rowStyleCycle, getItemKey } = this.$props;
        const emit = this.$events.emit;
        return (
            <VlistT
              style="flex: 1 1 auto"
              rowHeight={ rowHeight }
              rowComponent={ VtableRow }
              items={ items }
              rowStyleCycle={ rowStyleCycle }
              contentWidth={ this.contentWidth }
              ctx={ this.listCtx }
              getItemKey={ getItemKey }
              onScroll={ this.updateScrollPosition }
              onRowclick={ e => emit("rowclick", e) }
              onRowdblclick={ e => emit("rowdblclick", e) }
              onRowdragenter={ e => emit("rowdragenter", e) }
              onRowdragleave={ e => emit("rowdragleave", e) }
              onRowdragstart={ e => emit("rowdragstart", e) }
              onRowdragend={ e => emit("rowdragend", e) }
              onRowdragover={ e => emit("rowdragover", e) }
              onRowdrop={ e => emit("rowdrop", e) }
            >
              <div staticClass="vtable-header" slot="header" ref="header" style={ this.headerStyle }>
                { this.headerCells }
              </div>
            </VlistT>
        );
    }
}
