import * as _ from "lodash";
import Vue from "vue";
import { Vtable, VtableColumn } from "../..";

interface Item {
    id: string;
    name: string;
    checked: boolean;
}

const columns: VtableColumn[] = [
    {
        title: "id",
        className: "cell-id",
        defaultWidth: 150
    },
    {
        title: "name",
        className: "cell-name",
        defaultWidth: 200
    },
    {
        title: "extra1",
        className: "cell-extra",
        defaultWidth: 200
    },
    {
        title: "extra2",
        className: "cell-extra",
        defaultWidth: 200
    },
    {
        title: "description",
        className: "cell-desc",
        defaultWidth: 600
    }
];

const App = Vue.extend({
    // tslint:disable-next-line: no-var-requires
    template: require("./app.html"),
    components: { Vtable },
    data() {
        return {
            columns: Object.freeze(columns),
            selectedIndex: -1,
            rowHeight: 20,
            itemCount: 100,
            message: "vtable demo"
        };
    },
    computed: {
        items(): ReadonlyArray<Item> {
            return Object.freeze(
                _.range(1, this.itemCount + 1).map(i => {
                    return { id: i.toString(), name: `name of ${i}`, checked: false };
                })
            );
        }
    },
    methods: {
        updateParams() {
            const rowHeight = this.$refs.rowHeight as HTMLInputElement;
            const rowCount = this.$refs.rowCount as HTMLInputElement;
            this.rowHeight = parseInt(rowHeight.value, 10);
            this.itemCount = parseInt(rowCount.value, 10);
        },
        ensureVisible() {
            const index = (this.$refs.index as HTMLInputElement).valueAsNumber;
            (this.$refs.vtable as Vtable<any>).ensureVisible(index);
        },
        onRowClick(args: { item: Item; index: number }) {
            args.item.checked = !args.item.checked;
            this.selectedIndex = args.index;
        },
        getRowClass(item: Item, index: number) {
            return index === this.selectedIndex ? "vtable-row-selected" : "vtable-row";
        },
        getItemKey(item: Item) {
            return item.id;
        },
        getLabel(item: Item, index: number) {
            return item.id + (this.selectedIndex === index ? " (selected)" : "");
        },
        setChecked(item: Item, checked: boolean) {
            item.checked = checked;
        }
    }
});

// tslint:disable-next-line: no-unused-expression
new Vue({
    el: "#app",
    render(createElement) {
        return createElement(App);
    }
});
