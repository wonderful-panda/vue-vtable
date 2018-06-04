import { storiesOf } from "@storybook/vue";
import { withInfo } from "storybook-addon-vue-info";
import { VtableExample } from "./VtableExample";
import { VtreetableExample } from "./VtreetableExample";

storiesOf("Vtable", module).add(
    "Example",
    withInfo({ propTables: ["vtable"] })(() => VtableExample)
);
storiesOf("Vtreetable", module).add(
    "Example",
    withInfo({ propTables: ["vtreetable"] })(() => VtreetableExample)
);
