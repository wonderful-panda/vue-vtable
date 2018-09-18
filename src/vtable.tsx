import * as _ from "lodash";
import Vue, { PropOptions, VNode, VueConstructor } from "vue";
import { CssProperties } from "vue-css-definition";
import p from "vue-strict-prop";
import { Component, ComponentExtension, ExVue, Keys, WithProps } from "vue-tsx-support/lib/class";
import {
    GetClassFunction,
    GetKeyFunction,
    RowEventArgs,
    ScrollEventArgs,
    VtableColumn,
    VtableSlotCellProps
} from "../types";
import events from "./events";
import { VtableBase } from "./vtablebase";

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
    get [Keys.Events]() {
        return events<T>();
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
        const props = this.$props;
        return (
            <VtableBaseT
                ref="base"
                rowHeight={props.rowHeight}
                headerHeight={props.headerHeight}
                columns={props.columns}
                itemCount={props.items.length}
                sliceItems={this.sliceItems}
                rowStyleCycle={props.rowStyleCycle}
                splitterWidth={props.splitterWidth}
                rowClass={props.rowClass}
                getRowClass={props.getRowClass}
                getItemKey={props.getItemKey}
                widths={props.widths}
                overscan={props.overscan}
                {...{ on, scopedSlots }}
            />
        );
    }
}
