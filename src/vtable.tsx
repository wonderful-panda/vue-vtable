import * as _ from "lodash";
import Vue, { VNode } from "vue";
import { CssProperties } from "vue-css-definition";
import p from "vue-strict-prop";
import * as tc from "vue-typed-component";
import {
    GetClassFunction,
    GetKeyFunction,
    ScrollEventArgs,
    VtableColumn,
    VtableEvents,
    VtableEventsOn,
    VtableProps,
    VtableSlotCellProps
} from "../types";
import { VtableBase, VtableBaseProps } from "./vtablebase";

@tc.component(Vtable, {
    props: {
        rowHeight: p(Number).required,
        headerHeight: p(Number).optional,
        columns: p.ofRoArray<VtableColumn>().required,
        items: p.ofRoArray<T>().required,
        rowStyleCycle: p(Number).default(1),
        splitterWidth: p(Number).default(3),
        rowClass: p(String).optional,
        getRowClass: p.ofFunction<GetClassFunction<T>>().optional,
        getItemKey: p.ofFunction<GetKeyFunction<T>>().required,
        widths: p.ofObject<{ [columnId: string]: number }>().optional,
        overscan: p(Number).default(8)
    }
})
export class Vtable<T extends object> extends tc.EvTypedComponent<
    VtableProps<T>,
    VtableEvents<T>,
    VtableEventsOn<T>,
    { cell: VtableSlotCellProps<T> }
> {
    $refs!: { base: VtableBase<T> };
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
