import * as Vue from "vue";
import { px } from "./utils";
import { VtableListCtx } from "../types";
import { positive, notNegative } from "./validation";

interface VtableCellProps {
    item: any;
    index: number;
    columnIndex: number;
    height: number;
    ctx: VtableListCtx;
}

const required = true;

export default Vue.extend({
    name: "VtableCell",
    functional: true,
    props: {
        item: { required },
        index: { type: Number, required, validator: notNegative },
        columnIndex: { type: Number, required, validator: notNegative },
        height: { type: Number, required, validator: positive },
        ctx: { type: Object, required }
    },
    render(this: void, h, context) {
        const p: VtableCellProps = context.props;
        const column = p.ctx.columns[p.columnIndex];
        const w = px(p.ctx.widths[p.columnIndex]);
        const style = {
            minWidth: w,
            width: w,
            lineHeight: px(p.height),
            margin: 0,
            boxSizing: "border-box",
            overflow: "hidden"
        };
        return h("div", { class: ["vtable-cell", column.className], style }, [
                    column.render(h, p.item, p.index, p.ctx.ctx)
               ]);
    }

});

