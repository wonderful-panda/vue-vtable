import * as tc from "vue-typed-component";
import { px } from "./utils";
import vtablecell from "./vtablecell";
import vtablesplitter from "./vtablesplitter";
import { VtableListCtx } from "../types";
import { positive, notNegative } from "./validation";

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
        item: { required: true },
        index: { type: Number, required: true, validator: notNegative },
        height: { type: Number, required: true, validator: positive },
        ctx: { type: Object, required: true }
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
