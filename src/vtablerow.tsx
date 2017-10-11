import Vue from "vue";
import * as tc from "vue-typed-component";
import { props as p } from "vue-typed-component";
import { CssProperties } from "vue-css-definition";
import * as _ from "lodash";
import { px } from "./utils";
import * as t from "../types";

export interface VtableRowProps<T> {
    item: T;
    columns: t.ArrayLike<t.VtableColumn>;
    columnWidths: number[];
    index: number;
    height: number;
}

@tc.component<VtableRowProps<T>>({
    props: {
        item: p.Any.Required,
        columns: p.Arr.Required,
        columnWidths: p.Arr.Required,
        index: p.Num.Required.$nonNegative(),
        height: p.Num.Required.$positive()
    }
})
export default class VtableRow<T> extends tc.TypedComponent<
    VtableRowProps<T>,
    {
        splitter: { index: number };
        cell: t.VtableSlotCellProps<T>;
    }
> {
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
        return _.map(columns, (c, columnIndex) => [
            <div
                staticClass="vtable-cell"
                class={c.className}
                style={this.cellStyle(columnWidths[columnIndex])}
            >
                {this.$scopedSlots.cell({ index, item, columnId: c.title })}
            </div>,
            this.$scopedSlots.splitter({ index: columnIndex })
        ]);
    }

    render(): Vue.VNode {
        return <div style={this.rowStyle}>{this.cells}</div>;
    }
}
