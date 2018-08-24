import "vue-tsx-support/enable-check";
import Vue from "vue";
import { RecordPropsDefinition } from "vue/types/options";

declare global {
    type PropsDefOfComponent<C> = C extends { propsDef: () => infer PD } ? PD : never;
    type InnerPropsOfComponent<C> = C extends { propsDef: () => RecordPropsDefinition<infer P> }
        ? P
        : never;

    class Base extends Vue {
        __propsDef: PropsDefOfComponent<this>;
        $props: InnerPropsOfComponent<this>;
    }
}
