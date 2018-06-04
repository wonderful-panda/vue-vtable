import { VNode } from "vue";
import * as tc from "vue-typed-component";
import { GetClassFunction, GetKeyFunction, ScrollEventArgs, SliceFunction, VtableColumn, VtableEvents, VtableEventsOn, VtableSlotCellProps } from "../types";
import { Vlist } from "./vlist";
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
    widths?: {
        [columnId: string]: number;
    };
    getItemKey: GetKeyFunction<T>;
}
export interface VtableData {
    widths_: {
        [columnId: string]: number;
    };
    scrollLeft: number;
    splitterPositions: number[];
    draggingSplitter: number;
}
export declare class VtableBase<T> extends tc.StatefulEvTypedComponent<VtableBaseProps<T>, VtableEvents<T>, VtableData, VtableEventsOn<T>, {
    cell: VtableSlotCellProps<T>;
}> {
    $refs: {
        header: Element;
        vlist: Vlist<T>;
    };
    data(): VtableData;
    private readonly headerStyle;
    private headerCellStyle(width);
    private actualRowClass(item, index);
    private readonly actualSplitterWidth;
    readonly actualHeaderHeight: number;
    readonly contentWidth: number;
    ensureVisible(index: number): void;
    onScroll(args: ScrollEventArgs): void;
    updateScrollPosition(args: ScrollEventArgs): void;
    getColumnWidth(c: VtableColumn): number;
    setColumnWidth(c: VtableColumn, width: number): void;
    onSplitterMouseDown(index: number, clientX: number): void;
    private splitter(index);
    private readonly headerCells;
    render(): VNode;
}
