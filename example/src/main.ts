import * as Vue from "vue";
import vtable from "../../src/vtable";
import { component, p } from "vueit";

interface Item {
    id: string;
    name: string;
    checked: boolean;
}

interface AppCtx {
    selectedIndex: number;
}

@component()
class IdComponent extends Vue {
    @p item: Item;
    @p index: number;
    @p ctx: AppCtx;
    render(createElement) {
        const label = this.item.id + (this.ctx.selectedIndex === this.index ? " (selected)" : "");
        const item = this.item;
        return createElement("div", [
            createElement("input", { attrs: { type: "checkbox" },
                                     domProps: { "checked": item.checked },
                                     on: { "change": ev => item.checked = ev.target.checked } }),
            label
        ]);
    }
}

const columns: VtableColumn[] = [
    {
        title: "id",
        className: "cell-id",
        defaultWidth: 150,
        component: IdComponent
    },
    {
        title: "name",
        className: "cell-name",
        defaultWidth: 200,
        value: item => item.name
    },
    {
        title: "extra1",
        className: "cell-extra",
        defaultWidth: 200,
        value: item => "extra1 of " + item.id
    },
    {
        title: "extra2",
        className: "cell-extra",
        defaultWidth: 200,
        value: item => "extra2 of " + item.id
    },
    {
        title: "description",
        className: "cell-desc",
        defaultWidth: 600,
        value: item => "description of " + item.id
    }
];

interface AppData {
    columns: VtableColumn[];
    ctx: AppCtx;
    rowHeight: number;
    itemCount: number;
    message: string;
}

@component({
    compiledTemplate: require("./app.pug"),
    components: { vtable }
})
class App extends Vue {
    $data: AppData;
    data(): AppData {
        return {
            columns,
            ctx: { selectedIndex: -1 },
            rowHeight: 20,
            itemCount: 100,
            message: "vtable demo"
        };
    }

    get items() {
        return _.range(1, this.$data.itemCount + 1).map(i => {
            return { id: i.toString(), name: `name of ${ i }`, checked: false };
        });
    }

    onRowClick(args: { item: Item, index: number }) {
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

