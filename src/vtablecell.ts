import * as Vue from "vue";
import { functionalComponent, prop } from "vueit";
import { px } from "./utils";
import { VtableListCtx } from "../types";

@functionalComponent
export default class VtableCell<T> extends Vue {
    @prop.required item: T;
    @prop.required index: number;
    @prop.required columnIndex: number;
    @prop.required height: number;
    @prop.required ctx: VtableListCtx<T>;

    render(h, context) {
        const column = this.ctx.columns[this.columnIndex];
        const w = px(this.ctx.widths[this.columnIndex]);
        const style = {
            minWidth: w,
            width: w,
            lineHeight: px(this.height),
            margin: 0,
            boxSizing: "border-box",
            overflow: "hidden"
        };
        return h("div", { class: ["vtable-cell", column.className], style }, [
                    column.render(h, this.item, this.index, this.ctx.ctx)
               ]);
    }
}

