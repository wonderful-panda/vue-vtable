import * as Vue from "vue";
import { CssProperties } from "vue-css-definition";
import { functionalComponent, prop } from "vueit";
import { px } from "./utils";
import { VtableListCtx } from "../types";


@functionalComponent
export default class vtablesplitter extends Vue {

    @prop.required index: number;
    @prop.required ctx: VtableListCtx<any>;
    render(h, context) {
        const className = (this.ctx.draggingSplitter === this.index
                           ? "vtable-dragging-splitter" : "vtable-splitter");
        const style: CssProperties = {
            minWidth: px(this.ctx.splitterWidth),
            maxWidth: px(this.ctx.splitterWidth),
            height: "100%",
            boxSizing: "border-box",
            cursor: "col-resize"
        };
        const on = {
            mousedown: ev => this.ctx.onSplitterMouseDown(this.index, ev)
        }

        return h("div", { class: className, style, on });
    }
};

