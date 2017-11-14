import { CssProperties } from "vue-css-definition";
import * as tc from "vue-typed-component";
import p from "vue-strict-prop";
import { px } from "./utils";
import { modifiers as m } from "vue-tsx-support";
import { ComponentAdditionalAttrs } from "vue-tsx-support";
import Vue, { VNode, VNodeChildrenArrayContents, VNodeData } from "vue";
import { VueConstructor } from "vue/types/vue";

export interface VtableSplitterProps {
    dragging: boolean;
    width: number;
    mousedownCallback: (screenX: number) => void;
}

export const VtableSplitter = tc.functionalComponent<VtableSplitterProps>(
    "VtableSplitter",
    {
        dragging: p(Boolean).required,
        width: p(Number).required,
        mousedownCallback: p.ofFunction<() => void>().required
    },
    (h, { props }) => {
        const { dragging, width, mousedownCallback } = props;
        const className = dragging ? "vtable-dragging-splitter" : "vtable-splitter";
        const style: CssProperties = {
            minWidth: px(width),
            maxWidth: px(width),
            height: "100%",
            boxSizing: "border-box",
            cursor: "col-resize"
        };
        return (
            <div
                class={className}
                style={style}
                onClick={m.stop}
                onMousedown={m.stop.prevent(ev => mousedownCallback(ev.screenX))}
            />
        );
    }
);
