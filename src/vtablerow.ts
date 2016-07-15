import * as Vue from "vue";
import { px } from "./utils";
import { component, prop, p, pr, pd } from "vueit";

@component({
    template: require("./vtablerow.html")
})
export default class VtableRow extends Vue {
    @pr item: any;
    @pr index: number;
    @prop({ required: true, validator: v => v > 0 }) height: number;
    @p ctx: VtableListCtx;

    get rowStyle() {
        return {
            display: "flex",
            flex: "1 1 auto",
            width: "100%",
            height: px(this.height),
            lineHeight: px(this.height),
            boxSizing: "border-box",
            margin: 0
        };
    }

    cellStyle(width) {
        return {
            minWidth: px(width),
            flexBasis: px(width),
            lineHeight: px(this.height),
            margin: `0 ${this.ctx.splitterWidth}px 0 0`,
            boxSizing: "border-box",
            overflow: "hidden"
        };
    }

}
