import { configure } from "@storybook/vue";
import "./storybook.css";

import Vue from "vue";
import { Vtable } from "..";
Vue.component("vtable", Vtable);

function loadStories() {
    require("./stories");
}

configure(loadStories, module);
