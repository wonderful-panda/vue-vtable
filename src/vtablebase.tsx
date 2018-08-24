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
import { VtableRow_ } from "./vtablerow";
import { VtableSplitter } from "./vtablesplitter";
import { ScopedSlots } from "vue-tsx-support";
import Component from "vue-class-component";

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
    widths?: { [columnId: string]: number };
    getItemKey: GetKeyFunction<T>;
    overscan?: number;
}

@Component
export class VtableBase<T extends object> extends Base {
    $refs!: { header: Element; vlist: Vlist<T> };
    $scopedSlots!: ScopedSlots<{ cell: VtableSlotCellProps<T> }>;

    __events!: VtableEventsOn<T>;

    propsDef() {
        return {
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
            widths: p.ofObject<{ [columnId: string]: number }>().optional,
            overscan: p(Number).default(8)
        };
    }

    widths_ = {} as { [columnId: string]: number };
    scrollLeft = 0;
    splitterPositions = [] as number[];
    draggingSplitter = -1;

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
        const widths = this.$props.widths || this.widths_;
        return _.sumBy(
            this.$props.columns,
            c => (widths[c.id] || c.defaultWidth) + this.$props.splitterWidth!
        );
    }

    /* methods */
    ensureVisible(index: number) {
        this.$refs.vlist.ensureVisible(index);
    }
    onScroll(args: ScrollEventArgs) {
        this.updateScrollPosition(args);
        this.$emit("scroll", args);
    }
    updateScrollPosition(args: ScrollEventArgs) {
        this.scrollLeft = args.scrollLeft;
    }
    getColumnWidth(c: VtableColumn): number {
        const widths = this.$props.widths || this.widths_;
        const width = widths[c.id];
        return width === undefined ? c.defaultWidth : width;
    }
    setColumnWidth(c: VtableColumn, width: number): void {
        if (this.$props.widths) {
            this.$emit("update:widths", { ...this.$props.widths, [c.id]: width });
        } else {
            Vue.set(this.widths_, c.id, width);
        }
    }
    onSplitterMouseDown(index: number, clientX: number) {
        const headerCell = this.$refs.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.$props.columns[index];
        const startWidth = headerCell.clientWidth;
        const startX = clientX;
        const minWidth = column.minWidth || 5;
        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const offset = e.clientX - startX;
            const width = Math.max(startWidth + offset, minWidth);
            this.setColumnWidth(column, width);
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
    /* render */
    private splitter(index: number) {
        return (
            <VtableSplitter
                dragging={index === this.draggingSplitter}
                width={this.actualSplitterWidth}
                mousedownCallback={clientX => this.onSplitterMouseDown(index, clientX)}
            />
        );
    }
    private get headerCells() {
        const widths = this.$props.widths || this.widths_;
        return _.map(this.$props.columns, (c, index) => [
            <div
                staticClass="vtable-header-cell"
                class={c.className}
                style={this.headerCellStyle(widths[c.id] || c.defaultWidth)}
            >
                {c.title === undefined ? c.id : c.title}
            </div>,
            this.splitter(index)
        ]);
    }
    render(): VNode {
        const VlistT = Vlist as new () => Vlist<T>;
        const VtableRowT = VtableRow_ as new () => VtableRow_<T>;
        const {
            rowHeight,
            itemCount,
            sliceItems,
            rowStyleCycle,
            getItemKey,
            columns,
            overscan
        } = this.$props;
        const emit = this.$emit;
        const on = { ...this.$listeners, scroll: this.onScroll };
        return (
            <VlistT
                ref="vlist"
                style={{ flex: "1 1 auto" }}
                rowHeight={rowHeight}
                itemCount={itemCount}
                sliceItems={sliceItems}
                rowStyleCycle={rowStyleCycle}
                contentWidth={this.contentWidth}
                getItemKey={getItemKey}
                overscan={overscan}
                scopedSlots={{
                    row: ({ item, index }) => [
                        <VtableRowT
                            class={this.actualRowClass(item, index)}
                            columns={columns}
                            columnWidths={this.$props.widths || this.widths_}
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
