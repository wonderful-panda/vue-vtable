import Vue, { VNode } from "vue";
import { CssProperties } from "vue-css-definition";
import * as resizeSensor from "vue-resizesensor";
import * as tsx from "vue-tsx-support";
import * as t from "../types";
import { px } from "./utils";
import { Component, Prop, Watch } from "vue-property-decorator";

const emit = tsx.emit;

const ResizeSensor = tsx
  .ofType<{ debounce?: number }, { onResized: void }>()
  .convert(resizeSensor);

@Component
export class Vlist<T> extends Vue {
  $refs!: { scrollable: Element; content: Element };
  $scopedSlots!: tsx.InnerScopedSlots<{ row: t.VlistSlotRowProps<T> }>;
  _tsx!: tsx.ExposeAllPublicMembers<Vlist<T>, Vue, "ensureVisible"> &
    tsx.DefineEvents<t.VlistEvents<T>>;

  @Prop(Function) getItemKey!: t.GetKeyFunction<T>;
  @Prop(Number) contentWidth!: number;
  @Prop(Number) rowStyleCycle?: number;
  @Prop(Number) rowHeight!: number;
  @Prop(Number) itemCount!: number;
  @Prop(Function) sliceItems!: t.SliceFunction<T>;
  @Prop(Number) overscan?: number;

  private scrollLeft = 0;
  private scrollTop = 0;
  private scrollDirection = "forward" as "forward" | "backward";
  private bodyWidth = 0;
  private bodyHeight = 0;
  private vScrollBarWidth = 0;
  private hScrollBarHeight = 0;

  /* styles */
  private get containerStyle(): CssProperties {
    return {
      display: "flex",
      flexFlow: "column nowrap",
      overflow: "hidden"
    };
  }
  private get headerStyle(): CssProperties {
    return {
      display: "flex",
      flex: "0 0 auto",
      boxSizing: "border-box",
      minWidth: px(this.contentWidth),
      position: "relative",
      left: px(this.scrollLeft * -1),
      overflow: "hidden",
      padding: `0 ${px(this.vScrollBarWidth)} 0 0`
    };
  }
  private get scrollableStyle(): CssProperties {
    return {
      overflow: "auto",
      position: "relative",
      flex: "1 1 0px",
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      border: 0
    };
  }
  private get contentStyle(): CssProperties {
    return {
      display: "flex",
      flexFlow: "column nowrap",
      flex: "1 1 auto",
      position: "relative",
      boxSizing: "border-box",
      height: px(this.contentHeight),
      overflow: "hidden",
      minWidth: px(this.contentWidth)
    };
  }
  private get spacerStyle(): CssProperties {
    return {
      height: px(this.rowHeight * this.firstIndex),
      flex: "0 0 auto"
    };
  }
  private get rowStyle(): CssProperties {
    return {
      display: "flex",
      width: "100%",
      height: px(this.rowHeight)
    };
  }

  /* computed */
  private get firstIndex() {
    let value = Math.floor(this.scrollTop / this.rowHeight);
    const overscan = this.overscan || 8;
    if (this.scrollDirection === "backward") {
      value = Math.max(0, value - overscan);
    }
    const rowStyleCycle = this.rowStyleCycle;
    if (rowStyleCycle && rowStyleCycle > 1) {
      value -= value % rowStyleCycle;
    }
    return value;
  }
  private get lastIndex() {
    const { scrollTop, bodyHeight } = this;
    let value = Math.ceil((scrollTop + bodyHeight) / this.rowHeight);
    if (this.scrollDirection === "forward") {
      value += this.overscan || 8;
    }
    return value;
  }
  private get renderedItems() {
    return this.sliceItems(this.firstIndex, this.lastIndex + 1);
  }
  private get contentHeight() {
    return this.rowHeight * this.itemCount;
  }

  /* hook */
  activated() {
    this.updateBodySize();
    const { scrollLeft, scrollTop } = this.$refs.scrollable;
    this.scrollLeft = scrollLeft;
    this.scrollTop = scrollTop;
  }

  /* methods */
  ensureVisible(index: number) {
    const { rowHeight } = this;
    const { bodyHeight } = this;
    let { scrollTop } = this;
    const scrollTopMax = rowHeight * index;
    const scrollTopMin = Math.max(
      rowHeight * index - bodyHeight + rowHeight,
      0
    );
    if (scrollTopMax < scrollTop) {
      scrollTop = scrollTopMax;
    } else if (scrollTop < scrollTopMin) {
      scrollTop = scrollTopMin;
    } else {
      return;
    }
    const sc = this.$refs.scrollable;
    sc.scrollTop = scrollTop;
  }
  private updateBodySize() {
    const sc = this.$refs.scrollable;
    const bound = sc.getBoundingClientRect();
    const bodyWidth = sc.clientWidth;
    const bodyHeight = sc.clientHeight;
    const vScrollBarWidth = Math.floor(bound.width - bodyWidth);
    const hScrollBarHeight = Math.floor(bound.height - bodyHeight);
    if (
      this.bodyWidth !== bodyWidth ||
      this.bodyHeight !== bodyHeight ||
      this.vScrollBarWidth !== vScrollBarWidth ||
      this.hScrollBarHeight !== hScrollBarHeight
    ) {
      this.bodyWidth = bodyWidth;
      this.bodyHeight = bodyHeight;
      this.vScrollBarWidth = vScrollBarWidth;
      this.hScrollBarHeight = hScrollBarHeight;
    }
  }
  private nativeOnScroll(event: Event) {
    const { scrollLeft, scrollTop } = this.$refs.scrollable;
    this.scrollDirection = scrollTop < this.scrollTop ? "backward" : "forward";
    this.scrollLeft = scrollLeft;
    this.scrollTop = scrollTop;
    emit(this, "scroll", { scrollLeft, scrollTop, event });
  }
  private payload<E extends Event>(item: T, physicalIndex: number, event: E) {
    return { item, index: physicalIndex + this.firstIndex, event };
  }
  @Watch("contentHeight")
  private contentHeightChanged(newValue: number, _oldValue: number) {
    const hScrollBarHeight = this.hScrollBarHeight;
    const height = this.bodyHeight + hScrollBarHeight;
    if (0 < hScrollBarHeight === newValue < height) {
      // must re-check scrollbar visibilities
      this.updateBodySize();
    }
  }
  @Watch("contentWidth")
  private contentWidthChanged(newValue: number, _oldValue: number) {
    const vScrollBarWidth = this.vScrollBarWidth;
    const width = this.bodyWidth + vScrollBarWidth;
    if (0 < vScrollBarWidth === newValue < width) {
      // must re-check scrollbar visibilities
      this.updateBodySize();
    }
  }

  /* render */
  private get rows() {
    const row = this.$scopedSlots.row;
    const p = this.payload;
    return this.renderedItems.map((item, index) => (
      <div
        staticClass="vlist-row"
        key={this.getItemKey(item)}
        style={this.rowStyle}
        onClick={e => emit(this, "rowclick", p(item, index, e))}
        onDblclick={e => emit(this, "rowdblclick", p(item, index, e))}
        onContextmenu={e => emit(this, "rowcontextmenu", p(item, index, e))}
        onDragenter={e => emit(this, "rowdragenter", p(item, index, e))}
        onDragleave={e => emit(this, "rowdragleave", p(item, index, e))}
        onDragstart={e => emit(this, "rowdragstart", p(item, index, e))}
        onDragend={e => emit(this, "rowdragend", p(item, index, e))}
        onDragover={e => emit(this, "rowdragover", p(item, index, e))}
        onDrop={e => emit(this, "rowdrop", p(item, index, e))}
      >
        {row({ item, index: index + this.firstIndex })}
      </div>
    ));
  }

  render(): VNode {
    return (
      <div staticClass="vlist-container" style={this.containerStyle}>
        <div staticClass="vlist-header-row" style={this.headerStyle}>
          {this.$slots.header}
        </div>
        <div
          staticClass="vlist-scrollable"
          ref="scrollable"
          style={this.scrollableStyle}
          onScroll={this.nativeOnScroll}
        >
          <ResizeSensor debounce={50} onResized={this.updateBodySize} />
          <div
            staticClass="vlist-content"
            ref="content"
            style={this.contentStyle}
          >
            <div staticClass="vlist-spacer" style={this.spacerStyle} />
            {this.rows}
          </div>
        </div>
      </div>
    );
  }
}
