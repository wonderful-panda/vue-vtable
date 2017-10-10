import Vue from "vue";
import { CssProperties } from "vue-css-definition";
import { VtableProps, VtableEvents, ScrollEventArgs } from "../types";
import * as _ from "lodash";
import { px, supplier, ensureNotUndefined } from "./utils";
import * as tc from "vue-typed-component";
import * as p from "vue-typed-component/lib/props";
import Vlist from "./vlist";
import VtableRow from "./vtablerow";
import VtableSplitter from "./vtablesplitter";

export interface VtableData {
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
        rowStyleCycle: p.Num.Default(1).$positive(),
        splitterWidth: p.Num.Default(3).$positive(),
        rowClass: p.Str,
        getRowClass: p.Func.Default(supplier(() => undefined)),
        ctx: p.Any,
        getItemKey: p.Func.Required
    }
})
export default class Vtable<T> extends tc.StatefulEvTypedComponent<
    VtableProps<T>,
    VtableEvents<T>,
    VtableData
> {
    $refs: { header: Element };
    data(): VtableData {
        return {
            widths: _.map(this.$props.columns, c => c.defaultWidth),
            scrollLeft: 0,
            splitterPositions: [],
            draggingSplitter: -1
        };
    }

    /* style */
    private get headerStyle(): CssProperties {
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
    private headerCellStyle(width: number): CssProperties {
        return {
            minWidth: px(width),
            width: px(width),
            lineHeight: px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: "0",
            overflow: "hidden"
        };
    }
    private actualRowClass(item: T, index: number) {
        const { getRowClass, rowClass } = this.$props;
        if (getRowClass) {
            return getRowClass(item, index);
        } else {
            return rowClass || "vtable-row";
        }
    }
    private get actualSplitterWidth() {
        return ensureNotUndefined(this.$props.splitterWidth);
    }
    get actualHeaderHeight(): number {
        const { headerHeight, rowHeight } = this.$props;
        return headerHeight && headerHeight > 0 ? headerHeight : rowHeight;
    }
    get contentWidth() {
        return _.sumBy(this.$data.widths, w => w + this.actualSplitterWidth);
    }

    /* methods */
    updateScrollPosition(args: ScrollEventArgs) {
        this.$data.scrollLeft = args.scrollLeft;
    }
    onSplitterMouseDown(index: number, screenX: number) {
        const headerCell = this.$refs.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.$props.columns[index];
        const startWidth = headerCell.clientWidth;
        const startX = screenX;
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
    /* render */
    private splitter(index: number) {
        return (
            <VtableSplitter
                dragging={index === this.$data.draggingSplitter}
                width={this.actualSplitterWidth}
                mousedownCallback={screenX => this.onSplitterMouseDown(index, screenX)}
            />
        );
    }
    private get headerCells() {
        const widths = this.$data.widths;
        return _.map(this.$props.columns, (c, index) => [
            <div
                staticClass="vtable-header-cell"
                class={c.className}
                style={this.headerCellStyle(widths[index])}
            >
                {c.title}
            </div>,
            this.splitter(index)
        ]);
    }
    render(): Vue.VNode {
        const VlistT = Vlist as new () => Vlist<T>;
        const { rowHeight, items, columns, rowStyleCycle, getItemKey, ctx } = this.$props;
        const emit = this.$events.emit;
        return (
            <VlistT
                style="flex: 1 1 auto"
                rowHeight={rowHeight}
                items={items}
                rowStyleCycle={rowStyleCycle}
                contentWidth={this.contentWidth}
                getItemKey={getItemKey}
                onScroll={this.updateScrollPosition}
                onRowclick={e => emit("rowclick", e)}
                onRowdblclick={e => emit("rowdblclick", e)}
                onRowdragenter={e => emit("rowdragenter", e)}
                onRowdragleave={e => emit("rowdragleave", e)}
                onRowdragstart={e => emit("rowdragstart", e)}
                onRowdragend={e => emit("rowdragend", e)}
                onRowdragover={e => emit("rowdragover", e)}
                onRowdrop={e => emit("rowdrop", e)}
                scopedSlots={{
                    row: p => [
                        <VtableRow
                            class={this.actualRowClass(p.item, p.index)}
                            item={p.item}
                            columns={columns}
                            columnWidths={this.$data.widths}
                            index={p.index}
                            height={rowHeight}
                            ctx={ctx}
                            scopedSlots={{
                                splitter: p => [this.splitter(p.index)]
                            }}
                        />
                    ]
                }}
            >
                <div
                    staticClass="vtable-header"
                    slot="header"
                    ref="header"
                    style={this.headerStyle}
                >
                    {this.headerCells}
                </div>
            </VlistT>
        );
    }
}
