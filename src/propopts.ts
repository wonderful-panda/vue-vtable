import { PropOptions } from "vue";
import p from "vue-strict-prop";
import * as t from "../types";

export function getPropOptions<T>() {
    // prettier-ignore
    return {
        contentWidth: p(Number, String).optional,
        itemCount: p(Number).required,
        sliceItems: p.ofFunction<t.SliceFunction<T>>().required,
        getItemKey: p.ofFunction<t.GetKeyFunction<T>>().required,
        rowHeight: p(Number).validator(v => v > 0).required,
        rowStyleCycle: p(Number).validator(v => v > 0).default(1),
        headerHeight: p(Number).validator(v => v >= 0).optional,
        columns: p.ofRoArray<t.VtableColumn>().required,
        items: p.ofRoArray<T>().required,
        splitterWidth: p(Number).validator(v => v > 0).default(3),
        rowClass: p(String).optional,
        getRowClass: p.ofFunction<t.GetClassFunction<T>>().default(() => (() => undefined)),
        initialWidths: p.ofRoArray<number>().optional
    };
}
