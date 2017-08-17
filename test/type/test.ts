import Vue from "vue";
import * as _ from "lodash";
import { Vtable, VtableColumn, VtableProps } from "../..";

const items = _.range(0, 100);

const columns: VtableColumn<number>[] = [
    {
        title: "column1",
        className: "col1",
        defaultWidth: 100,
        minWidth: 100,
        render: (h, item, index, ctx) => index.toString()
    },
    {
        title: "column2",
        className: "col2",
        defaultWidth: 300,
        minWidth: 100,
        render: (h, item, index, ctx) => `col2 of ${index}`
    }
];
export default Vue.extend({
    name: "Test",
    components: { Vtable },
    render(h: Vue.CreateElement) {
        const props: Partial<VtableProps<number>> = {
            columns,
            items,
            getItemKey: i => i,
            rowHeight: 20
        };
        return h(Vtable, { props });
    }
});



