import { VNode } from "vue";
import * as tc from "vue-typed-component";
import { VtableEvents, VtableEventsOn, VtableProps, VtableSlotCellProps } from "../types";
import { VtableBase } from "./vtablebase";
export declare class Vtable<T> extends tc.EvTypedComponent<VtableProps<T>, VtableEvents<T>, VtableEventsOn<T>, {
    cell: VtableSlotCellProps<T>;
}> {
    $refs: {
        base: VtableBase<T>;
    };
    ensureVisible(index: number): void;
    private sliceItems(start, end);
    render(): VNode;
}
