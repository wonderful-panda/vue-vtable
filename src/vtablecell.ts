import * as tc from "vue-typed-component";
import * as p from "vue-typed-component/lib/props";
import { px } from "./utils";
import { VtableListCtx } from "../types";

export interface VtableCellProps {
    item: any;
    index: number;
    columnIndex: number;
    height: number;
    ctx: VtableListCtx<any>;
}

export default tc.functionalComponent<VtableCellProps>(
    "VtableCell",
    {
        item: p.Any.Required,
        index: p.Num.Required,
        columnIndex: p.Num.Required,
        height: p.Num.Required,
        ctx: p.Obj.Required
    },
    (h, { props }) => {
        const column = props.ctx.columns[props.columnIndex];
        const w = px(props.ctx.widths[props.columnIndex]);
        const style = {
            minWidth: w,
            width: w,
            lineHeight: px(props.height),
            margin: 0,
            boxSizing: "border-box",
            overflow: "hidden"
        };
        return h("div", { class: ["vtable-cell", column.className], style }, [
                    column.render(h, props.item, props.index, props.ctx.ctx)
               ]);
    }
);

