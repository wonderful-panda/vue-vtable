import * as Vue from "vue";
import { component, pr} from "vueit";
import { px } from "./utils";
import { VtableListCtx, StyleObject } from "../types";

@component({
    compiledTemplate: require("./vtablesplitter.pug")
})
export default class VtableSplitter extends Vue {
    @pr ctx: VtableListCtx;
    @pr index: number;

    get className() {
        if (this.ctx.draggingSplitter === this.index) {
            return "vtable-dragging-splitter";
        }
        else {
            return "vtable-splitter";
        }
    }

    get style(): StyleObject {
        return {
            minWidth: px(this.ctx.splitterWidth),
            maxWidth: px(this.ctx.splitterWidth),
            height: "100%",
            boxSizing: "border-box",
            cursor: "col-resize"
        };
    }

    onMouseDown(event: MouseEvent) {
        this.ctx.onSplitterMouseDown(this.index, event);
    }
}
