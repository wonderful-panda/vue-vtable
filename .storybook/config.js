import { configure } from "@storybook/vue";
import "./storybook.css";

configure(require.context("./stories", true, /\.stories\.tsx?$/), module);
