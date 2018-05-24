import { PropOptions } from "vue";
import p from "vue-strict-prop";
import * as t from "../types";

export function getPropOptions<T>() {
    // prettier-ignore
    return {
        // for all
        rowHeight: p(Number).validator(v => v > 0).required,
        getItemKey: p.ofFunction<t.GetKeyFunction<T>>().required,
        rowStyleCycle: p(Number).validator(v => v > 0).default(1),
        // for Vlist
        contentWidth: p(Number, String).optional,
        // for Vlist / VtableBase
        itemCount: p(Number).required,
        sliceItems: p.ofFunction<t.SliceFunction<T>>().required,
        // for VtableBase / Vtable
        headerHeight: p(Number).validator(v => v >= 0).optional,
        columns: p.ofRoArray<t.VtableColumn>().required,
        splitterWidth: p(Number).validator(v => v > 0).default(3),
        rowClass: p(String).optional,
        getRowClass: p.ofFunction<t.GetClassFunction<T>>().default(() => (() => undefined)),
        initialWidths: p.ofRoArray<number>().optional,
        // for Vtable
        items: p.ofRoArray<T>().required
    };
}
