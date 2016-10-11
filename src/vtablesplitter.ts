import * as Vue from "vue";
import { px } from "./utils";
import { VtableListCtx, StyleObject } from "../types";
import { notNegative } from "./validation";

interface VtableSplitterProps {
    ctx: VtableListCtx;
    index: number;
}

const required = true;

export default Vue.extend({
    name: "VtableSplitter",
    functional: true,
    props: {
        ctx: { type: Object, required },
        index: { type: Number, required, validator: notNegative }
    },
    render(this: void, h, context) {
        const p: VtableSplitterProps = context.props;
        const className = (p.ctx.draggingSplitter === p.index
                           ? "vtable-dragging-splitter" : "vtable-splitter");
        const style: StyleObject = {
            minWidth: px(p.ctx.splitterWidth),
            maxWidth: px(p.ctx.splitterWidth),
            height: "100%",
            boxSizing: "border-box",
            cursor: "col-resize"
        };
        const on = {
            mousedown: ev => p.ctx.onSplitterMouseDown(p.index, ev)
        }

        return h("div", { class: className, style, on });
    }
});

