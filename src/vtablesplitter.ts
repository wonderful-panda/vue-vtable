import * as Vue from "vue";
import { VueComponent, Prop } from "vue-typescript";
import { px } from "./utils";

@VueComponent({
    template: require("./vtablesplitter.pug")
})
export default class VtableSplitter extends Vue {
    @Prop({ required: true }) ctx: VtableListCtx;
    @Prop({ required: true }) index: number;

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
