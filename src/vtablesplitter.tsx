import Vue, { VNode, VNodeChildrenArrayContents, VNodeData } from "vue";
import { CssProperties } from "vue-css-definition";
import p from "vue-strict-prop";
import * as tsx from "vue-tsx-support";
import { VueConstructor } from "vue/types/vue";
import { px } from "./utils";

const m = tsx.modifiers;

export const VtableSplitter = tsx.component({
  functional: true,
  name: "VtableSplitter",
  props: {
    dragging: p(Boolean).required,
    width: p(Number).required,
    mousedownCallback: p.ofFunction<(x: number) => void>().required
  },
  render(_h, { props }): VNode {
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
        onMousedown={m.stop.prevent(ev => mousedownCallback(ev.clientX))}
      />
    );
  }
});
