import { configure } from "@storybook/vue";
import "./storybook.css";

import Vue from "vue";
import { Vtable, Vtreetable } from "..";
Vue.component("vtable", Vtable);
Vue.component("vtreetable", Vtreetable);

function loadStories() {
    require("./stories");
}

configure(loadStories, module);
