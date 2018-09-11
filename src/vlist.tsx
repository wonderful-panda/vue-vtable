import Vue, { VNode, VueConstructor, PropOptions } from "vue";
import { Component, ComponentExtension, Keys, ExVue } from "vue-tsx-support/lib/class";
import { CssProperties } from "vue-css-definition";
import * as resizeSensor from "vue-resizesensor";
import p from "vue-strict-prop";
import * as tsx from "vue-tsx-support";
import * as t from "../types";
import { px } from "./utils";
import events from "./events";

const ResizeSensor = resizeSensor as tsx.TsxComponent<
    Vue,
    { debounce?: number },
    { onResized: void }
>;

@Component({
    watch: {
        contentWidth: "onContentWidthChanged",
        contentHeight: "onContentHeightChanged"
    }
})
export class Vlist<T> extends ExVue {
    $refs!: { scrollable: Element; content: Element };
    get [Keys.PropsDef]() {
        return {
            getItemKey: p.ofFunction<t.GetKeyFunction<T>>().required,
            contentWidth: p(Number).optional,
            rowStyleCycle: p(Number).default(1),
            rowHeight: p(Number).required,
            itemCount: p(Number).required,
            sliceItems: p.ofFunction<t.SliceFunction<T>>().required,
            overscan: p(Number).default(8)
        };
    }

    get [Keys.ScopedSlots]() {
        return {
            row(_payload: { item: T; index: number }) {}
        };
    }

    get [Keys.Events]() {
        return events<T>();
    }

    scrollLeft = 0;
    scrollTop = 0;
    scrollDirection: "forward" | "backward" = "forward";
    bodyWidth = 0;
    bodyHeight = 0;
    vScrollBarWidth = 0;
    hScrollBarHeight = 0;

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
            minWidth: px(this.$props.contentWidth),
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
            minWidth: px(this.$props.contentWidth)
        };
    }
    private get spacerStyle(): CssProperties {
        return {
            height: px(this.$props.rowHeight * this.firstIndex),
            flex: "0 0 auto"
        };
    }
    private get rowStyle(): CssProperties {
        return {
            display: "flex",
            width: "100%",
            height: px(this.$props.rowHeight)
        };
    }

    /* computed */
    private get firstIndex() {
        let value = Math.floor(this.scrollTop / this.$props.rowHeight);
        if (this.scrollDirection === "backward") {
            value = Math.max(0, value - this.$props.overscan!);
        }
        const { rowStyleCycle } = this.$props;
        if (rowStyleCycle && rowStyleCycle > 1) {
            value -= value % rowStyleCycle;
        }
        return value;
    }
    private get lastIndex() {
        const { scrollTop, bodyHeight } = this;
        let value = Math.ceil((scrollTop + bodyHeight) / this.$props.rowHeight);
        if (this.scrollDirection === "forward") {
            value += this.$props.overscan!;
        }
        return value;
    }
    private get renderedItems() {
        return this.$props.sliceItems(this.firstIndex, this.lastIndex + 1);
    }
    private get contentHeight() {
        return this.$props.rowHeight * this.$props.itemCount;
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
        const { rowHeight } = this.$props;
        const { bodyHeight } = this;
        let { scrollTop } = this;
        const scrollTopMax = rowHeight * index;
        const scrollTopMin = Math.max(rowHeight * index - bodyHeight + rowHeight, 0);
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
    updateBodySize() {
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
    onScroll(event: Event) {
        const { scrollLeft, scrollTop } = this.$refs.scrollable;
        this.scrollDirection = scrollTop < this.scrollTop ? "backward" : "forward";
        this.scrollLeft = scrollLeft;
        this.scrollTop = scrollTop;
        this.$$emit.onScroll({ scrollLeft, scrollTop, event });
    }
    onContentHeightChanged(newValue: number, _oldValue: number) {
        const hScrollBarHeight = this.hScrollBarHeight;
        const height = this.bodyHeight + hScrollBarHeight;
        if (0 < hScrollBarHeight === newValue < height) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }

    onContentWidthChanged(newValue: number, _oldValue: number) {
        const vScrollBarWidth = this.vScrollBarWidth;
        const width = this.bodyWidth + vScrollBarWidth;
        if (0 < vScrollBarWidth === newValue < width) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }

    /* render */
    private get rows() {
        const emit = this.$$emit;
        const row = this.$scopedSlots.row;
        return this.renderedItems.map((item, physicalIndex) => {
            const index = physicalIndex + this.firstIndex;
            return (
                <div
                    staticClass="vlist-row"
                    key={this.$props.getItemKey(item)}
                    style={this.rowStyle}
                    onClick={event => emit.onRowclick({ item, index, event })}
                    onDblclick={event => emit.onRowdblclick({ item, index, event })}
                    onContextmenu={event => emit.onRowcontextmenu({ item, index, event })}
                    onDragenter={event => emit.onRowdragenter({ item, index, event })}
                    onDragleave={event => emit.onRowdragleave({ item, index, event })}
                    onDragstart={event => emit.onRowdragstart({ item, index, event })}
                    onDragend={event => emit.onRowdragend({ item, index, event })}
                    onDragover={event => emit.onRowdragover({ item, index, event })}
                    onDrop={event => emit.onRowdrop({ item, index, event })}
                >
                    {row({ item, index })}
                </div>
            );
        });
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
                    onScroll={this.onScroll}
                >
                    <ResizeSensor debounce={50} onResized={this.updateBodySize} />
                    <div staticClass="vlist-content" ref="content" style={this.contentStyle}>
                        <div staticClass="vlist-spacer" style={this.spacerStyle} />
                        {this.rows}
                    </div>
                </div>
            </div>
        );
    }
}
