import { storiesOf } from "@storybook/vue";
import { VNode } from "vue";

storiesOf("Vtable", module).add("simple", () => ({
    render(): VNode {
        return <div>test</div>;
    }
}));
