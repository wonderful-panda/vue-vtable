import Vue, { VNode } from "vue";
import { GetClassFunction, GetKeyFunction, SliceFunction, VtableColumn, VtableSlotCellProps, VlistEvents, VlistEventsOn } from "../types";
import { Vlist } from "./vlist";
import { InnerScopedSlots, DeclareOn, DeclareOnEvents } from "vue-tsx-support";
import { DeclareAutoProps } from "./tsx-util";
export declare class VtableBase<T> extends Vue {
    $refs: {
        header: Element;
        vlist: Vlist<T>;
    };
    $scopedSlots: InnerScopedSlots<{
        cell: VtableSlotCellProps<T>;
    }>;
    _tsx: DeclareAutoProps<VtableBase<T>, Vue, "ensureVisible"> & DeclareOn<VlistEvents<T>> & DeclareOnEvents<VlistEventsOn<T>>;
    rowHeight: number;
    headerHeight: number;
    columns: ReadonlyArray<VtableColumn>;
    itemCount: number;
    sliceItems: SliceFunction<T>;
    rowStyleCycle?: number;
    splitterWidth?: number;
    rowClass?: string;
    getRowClass?: GetClassFunction<T>;
    getItemKey: GetKeyFunction<T>;
    widths?: Record<string, number>;
    overscan?: number;
    private widthsPrivate;
    private draggingSplitter;
    private readonly headerStyle;
    private headerCellStyle;
    private actualRowClass;
    private readonly actualSplitterWidth;
    private readonly actualHeaderHeight;
    private readonly actualWidths;
    private readonly contentWidth;
    ensureVisible(index: number): void;
    private setColumnWidth;
    private onSplitterMouseDown;
    private splitter;
    private readonly headerCells;
    render(): VNode;
}
