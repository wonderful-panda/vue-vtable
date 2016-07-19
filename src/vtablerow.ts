import * as Vue from "vue";
import { px } from "./utils";
import { component, prop, p, pr, pd } from "vueit";
import vtablecell from "./vtablecell";

@component({
    template: require("./vtablerow.html"),
    components: { vtablecell }
})
export default class VtableRow extends Vue {
    @pr item: any;
    @pr index: number;
    @pr height: number;
    @pr ctx: VtableListCtx;

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
}
