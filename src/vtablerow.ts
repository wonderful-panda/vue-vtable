import * as Vue from "vue";
import { px } from "./utils";
import { VueComponent, Prop } from "vue-typescript";
import vtablecell from "./vtablecell";

@VueComponent({
    template: require("./vtablerow.pug"),
    components: { vtablecell }
})
export default class VtableRow extends Vue {
    @Prop({ required: true }) item: any;
    @Prop({ required: true }) index: number;
    @Prop({ required: true }) height: number;
    @Prop({ required: true }) ctx: VtableListCtx;

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
