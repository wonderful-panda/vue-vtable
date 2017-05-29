import { CssProperties } from "vue-css-definition";
import { VlistProps, VlistEvents } from "../types";
import * as resizeSensor from "vue-resizesensor";
import * as tc from "vue-typed-component";
import * as p from "vue-typed-component/lib/props";
import { px } from "./utils";

interface VlistData {
    scrollLeft: number;
    scrollTop: number;
    bodyWidth: number;
    bodyHeight: number;
    vScrollBarWidth: number;
    hScrollBarHeight: number;
}

@tc.component<VlistProps<T>>({
    ...require("./vlist.pug"),
    components: { resizeSensor },
    props: {
        rowComponent: p.Any.Required,
        items: p.Arr.Required,
        getItemKey: p.Func.Required,
        contentWidth: p.ofType([Number, String]),
        ctx: p.Any,
        rowHeight: p.Num.Required.$positive(),
        rowStyleCycle: p.Num.Default(1).$positive()
    },
    watch: {
        contentWidth: "onContentWidthChanged",
        contentHeight: "onContentHeightChanged"
    }
})
export default class Vlist<T> extends tc.StatefulEvTypedComponent<VlistProps<T>, VlistEvents<T>, VlistData> {
    $refs: { scrollable: Element, content: Element };

    data(): VlistData {
        return {
            scrollLeft: 0,
            scrollTop: 0,
            bodyWidth: 0,
            bodyHeight: 0,
            vScrollBarWidth: 0,
            hScrollBarHeight: 0
        };
    }

    /* styles */
    get containerStyle(): CssProperties {
        return {
            display: "flex",
            flexFlow: "column nowrap",
            overflow: "hidden"
        };
    }
    get headerStyle(): CssProperties {
        return {
            display: "flex",
            flex: "0 0 auto",
            boxSizing: "border-box",
            minWidth: px(this.$props.contentWidth),
            position: "relative",
            left: px(this.$data.scrollLeft * -1),
            overflow: "hidden",
            padding: `0 ${px(this.$data.vScrollBarWidth)} 0 0`
        };
    }
    get scrollableStyle() {
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
    get contentStyle(): CssProperties {
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
    get spacerStyle(): CssProperties {
        return {
            height: px(this.$props.rowHeight * this.firstIndex),
            flex: "0 0 auto"
        };
    }
    get rowStyle(): CssProperties {
        return {
            display: "flex",
            width: "100%",
            height: px(this.$props.rowHeight)
        };
    }

    /* computed */
    get firstIndex() {
        let value = Math.floor(this.$data.scrollTop / this.$props.rowHeight);
        const { rowStyleCycle } = this.$props;
        if (rowStyleCycle && rowStyleCycle > 1) {
            value -= (value % rowStyleCycle);
        }
        return value;
    }
    get lastIndex() {
        const {scrollTop, bodyHeight} = this.$data;
        return Math.ceil((scrollTop + bodyHeight) / this.$props.rowHeight);
    }
    get renderedItems() {
        return this.$props.items.slice(this.firstIndex, this.lastIndex + 1);
    }
    get contentHeight() {
        return this.$props.rowHeight * this.$props.items.length;
    }

    /* methods */
    updateBodySize() {
        const sc = this.$refs.scrollable;
        const bound = sc.getBoundingClientRect();
        const bodyWidth = sc.clientWidth;
        const bodyHeight = sc.clientHeight;
        const vScrollBarWidth = Math.floor(bound.width - bodyWidth);
        const hScrollBarHeight = Math.floor(bound.height - bodyHeight);
        const data = this.$data;
        if (data.bodyWidth !== bodyWidth ||
            data.bodyHeight !== bodyHeight ||
            data.vScrollBarWidth !== vScrollBarWidth ||
            data.hScrollBarHeight !== hScrollBarHeight) {

            data.bodyWidth = bodyWidth;
            data.bodyHeight = bodyHeight;
            data.vScrollBarWidth = vScrollBarWidth;
            data.hScrollBarHeight = hScrollBarHeight;
        }
    }
    onScroll(event: Event) {
        const { scrollLeft, scrollTop } = this.$refs.scrollable;
        this.$data.scrollLeft = scrollLeft;
        this.$data.scrollTop = scrollTop;
        this.$events.emit("scroll", { scrollLeft, scrollTop, event });
    }
    onRowClick(item: T, index: number, event: Event) {
        this.$events.emit("row-click", { item, index, event });
    }

    onContentHeightChanged(newValue: number, oldValue: number) {
        const hScrollBarHeight = this.$data.hScrollBarHeight;
        const height = this.$data.bodyHeight + hScrollBarHeight;
        if ((0 < hScrollBarHeight) === (newValue < height)) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }

    onContentWidthChanged(newValue: number, oldValue: number) {
        const vScrollBarWidth = this.$data.vScrollBarWidth;
        const width = this.$data.bodyWidth + vScrollBarWidth;
        if ((0 < vScrollBarWidth) === (newValue < width)) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }

}
