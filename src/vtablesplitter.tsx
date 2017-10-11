import Vue from "vue";
import { CssProperties } from "vue-css-definition";
import * as tc from "vue-typed-component";
import { props as p } from "vue-typed-component";
import { px } from "./utils";
import { modifiers as m } from "vue-tsx-support";

export interface VtableSplitterProps {
    dragging: boolean;
    width: number;
    mousedownCallback: (screenX: number) => void;
}

export default tc.functionalComponent<VtableSplitterProps>(
    "VtableSplitter",
    {
        dragging: p.Bool.Required,
        width: p.Num.Required,
        mousedownCallback: p.Func.Required
    },
    (h: Vue.CreateElement, { props }) => {
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
