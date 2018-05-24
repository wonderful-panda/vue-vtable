import * as _ from "lodash";
import Vue, { VNode } from "vue";
import { CssProperties } from "vue-css-definition";
import * as tc from "vue-typed-component";
import {
    ScrollEventArgs,
    VtableColumn,
    VtableEvents,
    VtableEventsOn,
    VtableProps,
    VtableSlotCellProps
} from "../types";
import { getPropOptions } from "./propopts";
import { pick } from "./utils";
import { VtableBase, VtableBaseProps } from "./vtablebase";

@tc.component(Vtable, {
    props: pick(getPropOptions<T>(), [
        "rowHeight",
        "headerHeight",
        "columns",
        "items",
        "rowStyleCycle",
        "splitterWidth",
        "rowClass",
        "getRowClass",
        "getItemKey",
        "initialWidths"
    ])
})
export class Vtable<T> extends tc.EvTypedComponent<
    VtableProps<T>,
    VtableEvents<T>,
    VtableEventsOn<T>,
    { cell: VtableSlotCellProps<T> }
> {
    $refs: { base: VtableBase<T> };
    /* methods */
    ensureVisible(index: number) {
        this.$refs.base.ensureVisible(index);
    }
    private sliceItems(start: number, end: number): ReadonlyArray<T> {
        return this.$props.items.slice(start, end);
    }
    render(): VNode {
        const VtableBaseT = VtableBase as new () => VtableBase<T>;
        const { items, ...others } = this.$props;
        const props: VtableBaseProps<T> = {
            ...others,
            itemCount: items.length,
            sliceItems: this.sliceItems
        };
        const on = this.$listeners;
        const scopedSlots = this.$scopedSlots;
        return <VtableBaseT ref="base" {...{ props, on, scopedSlots }} />;
    }
}
