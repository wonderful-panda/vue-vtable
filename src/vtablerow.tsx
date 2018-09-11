import * as _ from "lodash";
import Vue, { VNode, VueConstructor, PropOptions } from "vue";
import { CssProperties } from "vue-css-definition";
import p from "vue-strict-prop";
import * as t from "../types";
import { px } from "./utils";
import { Component, ComponentExtension, ExVue, Keys } from "vue-tsx-support/lib/class";

@Component
export class VtableRow<T> extends ExVue {
    get [Keys.PropsDef]() {
        return {
            item: { required: true } as PropOptions<T> & { required: true },
            columns: p.ofRoArray<t.VtableColumn>().required,
            columnWidths: p.ofObject<{ [columnId: string]: number }>().required,
            index: p(Number).validator(v => v >= 0).required,
            height: p(Number).validator(v => v > 0).required
        };
    }
    get [Keys.ScopedSlots]() {
        return {
            splitter(_props: { index: number }) {},
            cell(_props: t.VtableSlotCellProps<T>) {}
        };
    }
    get rowStyle(): CssProperties {
        return {
            display: "flex",
            flex: "1 1 auto",
            width: "100%",
            height: px(this.$props.height),
            lineHeight: px(this.$props.height),
            boxSizing: "border-box",
            margin: 0
        };
    }

    private cellStyle(width: number): CssProperties {
        const w = px(width);
        return {
            minWidth: w,
            width: w,
            lineHeight: px(this.$props.height),
            margin: 0,
            boxSizing: "border-box",
            overflow: "hidden"
        };
    }

    private get cells() {
        const { item, columns, columnWidths, index } = this.$props;
        const { cell, splitter } = this.$scopedSlots;
        return columns.map((c, columnIndex) => [
            <div
                class={["vtable-cell", c.className]}
                style={this.cellStyle(columnWidths[c.id] || c.defaultWidth)}
            >
                {cell({ index, item, columnId: c.id })}
            </div>,
            splitter({ index: columnIndex })
        ]);
    }

    render(): VNode {
        return <div style={this.rowStyle}>{this.cells}</div>;
    }
}
