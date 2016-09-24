import * as Vue from "vue";
import { px } from "./utils";
import { component, pr } from "vueit";

@component({
    template: require("./vtablecell.pug")
})
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
            margin: `0 ${this.ctx.splitterWidth}px 0 0`,
            boxSizing: "border-box",
            overflow: "hidden"
        };
    }

}
