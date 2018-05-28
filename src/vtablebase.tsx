import * as _ from "lodash";
import Vue, { VNode } from "vue";
import { CssProperties } from "vue-css-definition";
import p from "vue-strict-prop";
import * as tc from "vue-typed-component";
import {
    GetClassFunction,
    GetKeyFunction,
    ScrollEventArgs,
    SliceFunction,
    VtableColumn,
    VtableEvents,
    VtableEventsOn,
    VtableProps,
    VtableSlotCellProps
} from "../types";
import { ensureNotUndefined, px } from "./utils";
import { Vlist } from "./vlist";
import { VtableRow } from "./vtablerow";
import { VtableSplitter } from "./vtablesplitter";

export interface VtableBaseProps<T> {
    rowHeight: number;
    headerHeight?: number;
    columns: ReadonlyArray<VtableColumn>;
    itemCount: number;
    sliceItems: SliceFunction<T>;
    rowStyleCycle?: number;
    splitterWidth?: number;
    rowClass?: string;
    getRowClass?: GetClassFunction<T>;
    initialWidths?: ReadonlyArray<number>;
    getItemKey: GetKeyFunction<T>;
}

export interface VtableData {
    widths: number[];
    scrollLeft: number;
    splitterPositions: number[];
    draggingSplitter: number;
}

@tc.component(VtableBase, {
    props: {
        rowHeight: p(Number).required,
        headerHeight: p(Number).optional,
        columns: p.ofRoArray<VtableColumn>().required,
        itemCount: p(Number).required,
        sliceItems: p.ofFunction<SliceFunction<T>>().required,
        rowStyleCycle: p(Number).default(1),
        splitterWidth: p(Number).default(3),
        rowClass: p(String).optional,
        getRowClass: p.ofFunction<GetClassFunction<T>>().optional,
        getItemKey: p.ofFunction<GetKeyFunction<T>>().required,
        initialWidths: p.ofRoArray<number>().optional
    }
})
export class VtableBase<T> extends tc.StatefulEvTypedComponent<
    VtableBaseProps<T>,
    VtableEvents<T>,
    VtableData,
    VtableEventsOn<T>,
    { cell: VtableSlotCellProps<T> }
> {
    $refs: { header: Element; vlist: Vlist<T> };
    data(): VtableData {
        const { columns, initialWidths } = this.$props;
        return {
            widths: initialWidths ? [...initialWidths] : columns.map(c => c.defaultWidth),
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
    ensureVisible(index: number) {
        this.$refs.vlist.ensureVisible(index);
    }
    onScroll(args: ScrollEventArgs) {
        this.updateScrollPosition(args);
        this.$events.emit("scroll", args);
    }
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
            this.$events.emit("columnresize", { widths: this.$data.widths, event: e });
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
        const {
            rowHeight,
            itemCount,
            sliceItems,
            rowStyleCycle,
            getItemKey,
            columns
        } = this.$props;
        const emit = this.$events.emit;
        const on = { ...this.$listeners, scroll: this.onScroll };
        return (
            <VlistT
                ref="vlist"
                style="flex: 1 1 auto"
                rowHeight={rowHeight}
                itemCount={itemCount}
                sliceItems={sliceItems}
                rowStyleCycle={rowStyleCycle}
                contentWidth={this.contentWidth}
                getItemKey={getItemKey}
                scopedSlots={{
                    row: ({ item, index }) => [
                        <VtableRow
                            class={this.actualRowClass(item, index)}
                            columns={columns}
                            columnWidths={this.$data.widths}
                            item={item}
                            index={index}
                            height={rowHeight}
                            scopedSlots={{
                                splitter: ({ index: i }) => [this.splitter(i)],
                                cell: this.$scopedSlots.cell
                            }}
                        />
                    ]
                }}
                {...{ on }}
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
