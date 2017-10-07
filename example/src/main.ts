import Vue from "vue";
import * as _ from "lodash";
import * as tc from "vue-typed-component";
import vtable from "../../src/vtable";
import { VtableColumn } from "../../types";

interface Item {
    id: string;
    name: string;
    checked: boolean;
}

interface AppCtx {
    selectedIndex: number;
}

const columns: VtableColumn<Item>[] = [
    {
        title: "id",
        className: "cell-id",
        defaultWidth: 150,
        render: (h, item, index, ctx) => {
            const label = item.id + (ctx.selectedIndex === index ? " (selected)" : "");
            return h("div", [
                h("input", {
                    attrs: { type: "checkbox" },
                    domProps: { checked: item.checked },
                    on: { change: (ev: Event) => (item.checked = (ev.target as any).checked) }
                }),
                label
            ]);
        }
    },
    {
        title: "name",
        className: "cell-name",
        defaultWidth: 200,
        render: (h, item) => item.name
    },
    {
        title: "extra1",
        className: "cell-extra",
        defaultWidth: 200,
        render: (h, item) => "extra1 of " + item.id
    },
    {
        title: "extra2",
        className: "cell-extra",
        defaultWidth: 200,
        render: (h, item) => "extra2 of " + item.id
    },
    {
        title: "description",
        className: "cell-desc",
        defaultWidth: 600,
        render: (h, item) => "description of " + item.id
    }
];

interface AppData {
    columns: ReadonlyArray<VtableColumn<Item>>;
    ctx: AppCtx;
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

@tc.component<{}, App>({
    ...require("./app.pug"),
    components: { vtable },
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
            ctx: { selectedIndex: -1 },
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
        this.$data.ctx.selectedIndex = args.index;
    }

    getRowClass(item: Item, index: number) {
        return index === this.$data.ctx.selectedIndex ? "vtable-row-selected" : "vtable-row";
    }

    getItemKey(item: Item, index: number) {
        return item.id;
    }
}

new Vue({
    el: "#app",
    render: function(createElement) {
        return createElement(App);
    }
});
