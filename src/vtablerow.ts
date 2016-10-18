import * as Vue from "vue";
import { component, prop as p } from "vueit";
import { px } from "./utils";
import vtablecell from "./vtablecell";
import vtablesplitter from "./vtablesplitter";
import { VtableListCtx } from "../types";
import { positive, notNegative } from "./validation";

interface VtableRowProps {
    item: any;
    index: number;
    height: number;
    ctx: VtableListCtx;
}

@component({
    compiledTemplate: require("./vtablerow.pug"),
    components: { vtablecell, vtablesplitter }
})
export default class VtableRow extends Vue implements VtableRowProps {
    @p.required item: any;
    @p.required({ validator: notNegative }) index: number;
    @p.required({ validator: positive }) height: number;
    @p.required ctx: VtableListCtx;
    get rowStyle(this: VtableRowProps) {
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
