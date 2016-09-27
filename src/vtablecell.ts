import * as Vue from "vue";
import { px } from "./utils";
import { VueComponent, Prop } from "vue-typescript";

@VueComponent({
    template: require("./vtablecell.pug")
})
export default class VtableCell extends Vue {
    @Prop({ required: true }) item: any;
    @Prop({ required: true }) index: number;
    @Prop({ required: true }) columnIndex: number;
    @Prop({ required: true }) height: number;
    @Prop({ required: true }) ctx: VtableListCtx;

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

}
