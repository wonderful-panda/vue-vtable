import Vue from "vue";
import * as _ from "lodash";
import * as tc from "vue-typed-component";
import { Vtable } from "../..";
import { VtableColumn } from "../..";

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

interface AppData {
    columns: ReadonlyArray<VtableColumn>;
    selectedIndex: number;
    rowHeight: number;
    items: ReadonlyArray<Item>;
    message: string;
}

function createItems(num: number): ReadonlyArray<Item> {
    return Object.freeze(
        _.range(1, num + 1).map(i => {
            return { id: i.toString(), name: `name of ${i}`, checked: false };
        })
    );
}

@tc.component(App, {
    ...require("./app.pug"),
    components: { Vtable },
    props: {}
})
class App extends tc.TypedComponent<{}> {
    $refs: {
        rowHeight: HTMLInputElement;
        rowCount: HTMLInputElement;
    };
    $data: AppData;
    data(): AppData {
        return {
            columns: Object.freeze(columns),
            selectedIndex: -1,
            rowHeight: 20,
            items: createItems(100),
            message: "vtable demo"
        };
    }

    updateParams() {
        this.$data.rowHeight = parseInt(this.$refs.rowHeight.value);
        this.$data.items = this.createItems(parseInt(this.$refs.rowCount.value));
    }

    createItems(num: number): ReadonlyArray<Item> {
        return createItems(num);
    }

    onRowClick(args: { item: Item; index: number }) {
        args.item.checked = !args.item.checked;
        this.$data.selectedIndex = args.index;
    }

    getRowClass(item: Item, index: number) {
        return index === this.$data.selectedIndex ? "vtable-row-selected" : "vtable-row";
    }

    getItemKey(item: Item, index: number) {
        return item.id;
    }

    getLabel(item: Item, index: number) {
        return item.id + (this.$data.selectedIndex === index ? " (selected)" : "");
    }

    setChecked(item: Item, checked: boolean) {
        item.checked = checked;
    }
}

new Vue({
    el: "#app",
    render: function(createElement) {
        return createElement(App);
    }
});
