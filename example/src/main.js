import Vue from "vue";
import { vtable } from "../../src/index";

const columns = [
    {
        title: "id",
        className: "cell-id",
        defaultWidth: 150,
        component: Vue.extend({
            name: "idcomponent",
            template: `<div><input type="checkbox" v-model="item.checked">{{ label }}</div>`,
            props: ["item", "index", "ctx"],
            computed: {
                label() {
                    return this.item.id + (this.ctx.selectedIndex === this.index ? " (selected)" : "");
                }
            }
        })
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

const app = Vue.extend({
    name: "App",
    template: require("./app.html"),
    components: { vtable },
    data() {
        return {
            columns,
            ctx: { selectedIndex: -1 },
            rowHeight: 20,
            itemCount: 100,
            message: "vtable demo"
        };
    },
    computed: {
        items() {
            return _.range(1, this.itemCount + 1).map(i => {
                return { id: i, name: "name of " + i, checked: false };
            });
        }
    },
    methods: {
        onRowClick: function(args) {
            args.item.checked = !args.item.checked;
            this.ctx.selectedIndex = args.index;
        },
        getRowClass: function(item, index) {
            return item.index === this.ctx.selectedIndex ? "vtable-row-selected" : "vtable-row";
        },
        getItemKey(item, index) {
            return item.id;
        }
    }
});

new Vue({
    el: "#app",
    components: { app: app }
});
