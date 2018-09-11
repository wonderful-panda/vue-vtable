import * as _ from "lodash";
import Vue, { VNode, VueConstructor, PropOptions } from "vue";
import { CssProperties } from "vue-css-definition";
import p from "vue-strict-prop";
import {
    GetClassFunction,
    GetKeyFunction,
    ScrollEventArgs,
    VtableColumn,
    VtableSlotCellProps
} from "../types";
import { VtableBase } from "./vtablebase";
import { Component, WithProps, ComponentExtension, Keys, ExVue } from "vue-tsx-support/lib/class";

@Component
export class Vtable<T> extends ExVue {
    $refs!: { base: VtableBase<T> };
    get [Keys.PropsDef]() {
        return {
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
        };
    }
    get [Keys.ScopedSlots]() {
        return {
            cell(_props: VtableSlotCellProps<T>) {}
        };
    }
    /* methods */
    ensureVisible(index: number) {
        this.$refs.base.ensureVisible(index);
    }
    private sliceItems(start: number, end: number): ReadonlyArray<T> {
        return this.$props.items.slice(start, end);
    }
    render(): VNode {
        const VtableBaseT = VtableBase as new () => VtableBase<T>;
        const on = this.$listeners;
        const scopedSlots = this.$scopedSlots;
        const p = this.$props;
        return (
            <VtableBaseT
                ref="base"
                rowHeight={p.rowHeight}
                headerHeight={p.headerHeight}
                columns={p.columns}
                itemCount={p.items.length}
                sliceItems={this.sliceItems}
                rowStyleCycle={p.rowStyleCycle}
                splitterWidth={p.splitterWidth}
                rowClass={p.rowClass}
                getRowClass={p.getRowClass}
                getItemKey={p.getItemKey}
                widths={p.widths}
                overscan={p.overscan}
                {...{ on, scopedSlots }}
            />
        );
    }
}
