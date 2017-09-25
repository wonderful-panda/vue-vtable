import * as tc from "vue-typed-component";
import * as p from "vue-typed-component/lib/props";
import { px } from "./utils";
import vtablecell from "./vtablecell";
import vtablesplitter from "./vtablesplitter";
import { VtableListCtx } from "../types";

interface VtableRowProps<T> {
    item: T;
    index: number;
    height: number;
    ctx: VtableListCtx<T>;
}

@tc.component<VtableRowProps<T>, VtableRow<T>>({
    ...require("./vtablerow.pug"),
    components: { vtablecell: vtablecell, vtablesplitter },
    props: {
        item: p.Any.Required,
        index: p.Num.Required.$nonNegative(),
        height: p.Num.Required.$positive(),
        ctx: p.Obj.Required
    }
})
export default class VtableRow<T> extends tc.TypedComponent<VtableRowProps<T>> {
    get rowStyle() {
        return {
            display: "flex",
            flex: "1 1 auto",
            width: "100%",
            height: px(this.$props.height),
            lineHeight: px(this.$props.height),
            boxSizing: "border-box",
            margin: 0
        };
    }
}
