import { CssProperties } from "vue-css-definition";
import * as tc from "vue-typed-component";
import * as p from "vue-typed-component/lib/props";
import { px } from "./utils";
import { VtableListCtx } from "../types";


export interface VtableSplitterProps {
    index: number;
    ctx: VtableListCtx<any>;
}

export default tc.functionalComponent<VtableSplitterProps>(
    "VtableSplitter",
    {
        index: p.Num.Required,
        ctx: p.Obj.Required
    },
    (h, { props }) => {
        const className = (props.ctx.draggingSplitter === props.index
                           ? "vtable-dragging-splitter" : "vtable-splitter");
        const style: CssProperties = {
            minWidth: px(props.ctx.splitterWidth),
            maxWidth: px(props.ctx.splitterWidth),
            height: "100%",
            boxSizing: "border-box",
            cursor: "col-resize"
        };
        const on = {
            mousedown: (ev: MouseEvent) => props.ctx.onSplitterMouseDown(props.index, ev)
        };

        return h("div", { class: className, style, on });
    }
);

