import * as Vue from "vue";
import { px } from "./utils";
import { component, pr } from "vueit";
import { VtableListCtx } from "../types";

@component()
export default class VtableCell extends Vue {
    @pr item: any;
    @pr index: number;
    @pr columnIndex: number;
    @pr height: number;
    @pr ctx: VtableListCtx;

    get column() {
        return this.ctx.columns[this.columnIndex];
    }
    get style() {
        const w = px(this.ctx.widths[this.columnIndex]);
        return {
            minWidth: w,
            width: w,
            lineHeight: px(this.height),
            margin: 0,
            boxSizing: "border-box",
            overflow: "hidden"
        };
    }
    render(h) {
        return h("div", {
            "class": ["vtable-cell", this.column.className],
            style: this.style,
        }, [
            this.column.render(h, this.item, this.index, this.ctx.ctx)
        ]);
    }
}
