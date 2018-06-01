import { storiesOf } from "@storybook/vue";
import { VtableExample } from "./VtableExample";
import { withInfo } from "storybook-addon-vue-info";

storiesOf("vtable", module).add(
    "Basic example",
    withInfo({
        propTables: ["vtable"]
    })(() => VtableExample)
);
