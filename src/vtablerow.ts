import * as Vue from "vue";
import VueComponent from "vue-class-component";
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

const required = true;

const { render, staticRenderFns } = require("./vtablerow.pug");

@VueComponent({
    render,
    staticRenderFns,
    components: { vtablecell, vtablesplitter },
    props: {
        item: { required },
        index: { type: Number, required, validator: notNegative },
        height: { type: Number, required, validator: positive },
        ctx: { type: Object, required }
    },
})
export default class VtableRow extends Vue {
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
