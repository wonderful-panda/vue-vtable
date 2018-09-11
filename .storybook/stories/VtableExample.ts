import * as _ from "lodash";
import _c from "vue-component-marker";
import { VtableColumn, VtableEvents } from "../..";
import template from "./VtableExample.html";

interface Item {
    id: string;
    name: string;
    description: string;
    checked: boolean;
}

const columns: VtableColumn[] = [
    {
        id: "id",
        defaultWidth: 100
    },
    {
        id: "name",
        defaultWidth: 200
    },
    {
        id: "description",
        className: "cell-end",
        defaultWidth: 600
    }
];

export const VtableExample = _c({
    name: "VtableExample",
    template,
    data() {
        return {
            columns: columns,
            items: Object.freeze(
                _.range(1, 1001).map(i => {
                    return {
                        id: i.toString(),
                        name: `name of ${i}`,
                        description: `description of ${i}`,
                        checked: false
                    };
                })
            ) as ReadonlyArray<Item>,
            selectedIndex: -1
        };
    },
    methods: {
        onRowClick(args: VtableEvents<Item>["rowclick"]) {
            args.item.checked = !args.item.checked;
            this.selectedIndex = args.index;
        },
        getRowClass(item: Item, index: number) {
            return index === this.selectedIndex ? "vtable-row-selected" : "vtable-row";
        },
        getItemKey(item: Item) {
            return item.id;
        },
        setChecked(item: Item, checked: boolean) {
            item.checked = checked;
        }
    }
});
