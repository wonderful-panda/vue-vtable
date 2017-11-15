import Vue, { VNode } from "vue";
import * as _ from "lodash";
import { CssProperties } from "vue-css-definition";
import {
    VtableColumn,
    VtableProps,
    VtableEvents,
    VtableEventsOn,
    VtableSlotCellProps,
    ScrollEventArgs
} from "../types";
import { px, supplier, ensureNotUndefined } from "./utils";
import * as tc from "vue-typed-component";
import p from "vue-strict-prop";
import { Vlist } from "./vlist";
import { VtableRow } from "./vtablerow";
import { VtableSplitter } from "./vtablesplitter";

export interface VtableData {
    widths: number[];
    scrollLeft: number;
    splitterPositions: number[];
    draggingSplitter: number;
}

@tc.component(Vtable, {
    // prettier-ignore
    props: {
        rowHeight: p(Number).validator(v => v > 0).required,
        headerHeight: p(Number).validator(v => v >= 0).optional,
        columns: p.ofRoArray<VtableColumn>().required,
        items: p.ofRoArray<T>().required,
        rowStyleCycle: p(Number).validator(v => v > 0).default(1),
        splitterWidth: p(Number).validator(v => v > 0).default(3),
        rowClass: p(String).optional,
        getRowClass: p.ofFunction<(item: T, index: number) => (string | undefined)>()
                      .default(supplier(() => undefined)),
        getItemKey: p.ofFunction<(item: T) => (number | string)>().required
    }
})
export class Vtable<T> extends tc.StatefulEvTypedComponent<
    VtableProps<T>,
    VtableEvents<T>,
    VtableData,
    VtableEventsOn<T>,
    { cell: VtableSlotCellProps<T> }
> {
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
    render(): VNode {
        const VlistT = Vlist as new () => Vlist<T>;
        const { rowHeight, items, columns, rowStyleCycle, getItemKey } = this.$props;
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
                            scopedSlots={{
                                splitter: p => [this.splitter(p.index)],
                                cell: this.$scopedSlots.cell
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
