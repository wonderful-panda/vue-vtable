import Vue from "vue";
import * as tsx from "vue-tsx-support/lib/api";
import { CssProperties } from "vue-css-definition";
import * as tc from "vue-typed-component";
import * as p from "vue-typed-component/lib/props";
import { px } from "./utils";
import { VtableListCtx } from "../types";
import * as m from "vue-tsx-support/lib/modifiers";


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
        const { ctx, index } = props;
        const className = (ctx.draggingSplitter === props.index
                           ? "vtable-dragging-splitter" : "vtable-splitter");
        const style: CssProperties = {
            minWidth: px(ctx.splitterWidth),
            maxWidth: px(ctx.splitterWidth),
            height: "100%",
            boxSizing: "border-box",
            cursor: "col-resize"
        };

        return (
            <div
              class={ className }
              style={ style }
              onMousedown={ m.stop(ev => ctx.onSplitterMouseDown(index, ev)) }
              onClick={ m.stop }
            />
        );
    }
) as tsx.TsxComponent<Vue, VtableSplitterProps, {}>;

