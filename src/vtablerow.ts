import * as Vue from "vue";
import { px } from "./utils";
import { component, pr } from "vueit";
import vtablecell from "./vtablecell";
import vtablesplitter from "./vtablesplitter";
import * as types from "../types";

@component({
    compiledTemplate: require("./vtablerow.pug"),
    components: { vtablecell, vtablesplitter }
})
export default class VtableRow extends Vue {
    @pr item: any;
    @pr index: number;
    @pr height: number;
    @pr ctx: types.VtableListCtx;

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
