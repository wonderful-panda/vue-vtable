import { configure } from "@storybook/vue";
import "./storybook.css";

import Vue from "vue";
import { Vtable, Vtreetable, ExpandableCell } from "..";
Vue.component("vtable", Vtable);
Vue.component("vtreetable", Vtreetable);
Vue.component("expandable-cell", ExpandableCell);

function loadStories() {
    require("./stories");
}

configure(loadStories, module);
