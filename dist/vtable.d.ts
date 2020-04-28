import Vue, { VNode } from "vue";
import { GetClassFunction, GetKeyFunction, VtableColumn, VtableSlotCellProps, VtableEvents, VtableEventsOn } from "../types";
import { VtableBase } from "./vtablebase";
import { InnerScopedSlots, DeclareOn, DeclareOnEvents } from "vue-tsx-support";
import { DeclareAutoProps } from "./tsx-util";
export declare class Vtable<T> extends Vue {
    $refs: {
        base: VtableBase<T>;
    };
    $scopedSlots: InnerScopedSlots<{
        cell: VtableSlotCellProps<T>;
    }>;
    _tsx: DeclareAutoProps<Vtable<T>, Vue, "ensureVisible"> & DeclareOn<VtableEvents<T>> & DeclareOnEvents<VtableEventsOn<T>>;
    rowHeight: number;
    headerHeight?: number;
    columns: ReadonlyArray<VtableColumn>;
    items: ReadonlyArray<T>;
    rowStyleCycle?: number;
    splitterWidth?: number;
    rowClass?: string;
    getRowClass?: GetClassFunction<T>;
    getItemKey: GetKeyFunction<T>;
    widths?: Record<string, number>;
    overscan?: number;
    ensureVisible(index: number): void;
    private sliceItems;
    render(): VNode;
}
