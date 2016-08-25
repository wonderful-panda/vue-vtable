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
    template: require("./app.html"),
    components: { vtable },
    data() {
        return {
            columns,
            ctx: { selectedIndex: -1 },
            rowHeight: 20,
            items: this.createItems(500),
            message: "vtable demo"
        };
    },
    methods: {
        createItems(rowCount) {
            return _.range(1, rowCount + 1).map(i => {
                return { id: i, name: "name of " + i, checked: false };
            });
        },
        onRowClick: function(args) {
            args.item.checked = !args.item.checked;
            this.ctx.selectedIndex = args.index;
        },
        getRowClass: function(item, index) {
            return item.index === this.ctx.selectedIndex ? "vtable-row-selected" : "vtable-row";
        }
    }
});

new Vue({
    el: "body",
    components: { app: app }
});
