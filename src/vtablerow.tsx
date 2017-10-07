import * as tc from "vue-typed-component";
import * as p from "vue-typed-component/lib/props";
import { CssProperties } from "vue-css-definition";
import * as _ from "lodash";
import { px } from "./utils";
import VtableSplitter from "./vtablesplitter";
import { VtableListCtx } from "../types";

export interface VtableRowProps<T> {
    item: T;
    index: number;
    height: number;
    ctx: VtableListCtx<T>;
}

@tc.component<VtableRowProps<T>, VtableRow<T>>({
    props: {
        item: p.Any.Required,
        index: p.Num.Required.$nonNegative(),
        height: p.Num.Required.$positive(),
        ctx: p.Obj.Required
    }
})
export default class VtableRow<T> extends tc.TypedComponent<VtableRowProps<T>> {
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

    cellStyle(width: number): CssProperties {
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

    get cells() {
        const { ctx, item, index } = this.$props;
        return _.map(ctx.columns, (c, columnIndex) => [
            <div
                staticClass="vtable-cell"
                class={c.className}
                style={this.cellStyle(ctx.widths[columnIndex])}
            >
                {c.render(this.$createElement, item, index, ctx.ctx)}
            </div>,
            <VtableSplitter index={columnIndex} ctx={ctx} />
        ]);
    }

    render() {
        const { ctx, item, index } = this.$props;
        return (
            <div class={ctx.getRowClass(item, index)} style={this.rowStyle}>
                {this.cells}
            </div>
        );
    }
}
