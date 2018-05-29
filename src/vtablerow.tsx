import * as _ from "lodash";
import Vue, { VNode } from "vue";
import { CssProperties } from "vue-css-definition";
import p from "vue-strict-prop";
import * as tc from "vue-typed-component";
import * as t from "../types";
import { px } from "./utils";

export interface VtableRowProps<T> {
    item: T;
    columns: ReadonlyArray<t.VtableColumn>;
    columnWidths: { [columnId: string]: number };
    index: number;
    height: number;
}

@tc.component(VtableRow, {
    props: {
        item: p.ofAny().required,
        columns: p.ofRoArray<t.VtableColumn>().required,
        columnWidths: p.ofObject<{ [columnId: string]: number }>().required,
        index: p(Number).validator(v => v >= 0).required,
        height: p(Number).validator(v => v > 0).required
    }
})
export class VtableRow<T> extends tc.TypedComponent<
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
        return columns.map((c, columnIndex) => [
            <div
                staticClass="vtable-cell"
                class={c.className}
                style={this.cellStyle(columnWidths[c.id] || c.defaultWidth)}
            >
                {this.$scopedSlots.cell({ index, item, columnId: c.id })}
            </div>,
            this.$scopedSlots.splitter({ index: columnIndex })
        ]);
    }

    render(): VNode {
        return <div style={this.rowStyle}>{this.cells}</div>;
    }
}
