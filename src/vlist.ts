import * as Vue from "vue";
import { CssProperties } from "vue-css-definition";
import { VlistProps } from "../types";
import * as resizeSensor from "vue-resizesensor";
import { component, prop as p, watch } from "vueit";
import { px } from "./utils";
import { positive } from "./validation";

export interface ScrollEventArgs {
    scrollLeft: number;
    scrollTop: number;
}

interface VlistData {
    scrollLeft: number;
    scrollTop: number;
    bodyWidth: number;
    bodyHeight: number;
    vScrollBarWidth: number;
    hScrollBarHeight: number;
}

@component<Vlist<T>>({
    compiledTemplate: require("./vlist.pug"),
    components: { resizeSensor },
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
})
export default class Vlist<T> extends Vue implements VlistProps<T> {
    $data: VlistData;
    $refs: { scrollable: Element, content: Element };

    @p.required rowComponent: string | Vue;
    @p.required items: T[];
    @p.required getItemKey: (item: T) => string;
    @p({ type: [Number, String] })  contentWidth?: number | string;
    @p ctx?: any;
    @p.required({ validator: positive }) rowHeight: number;
    @p.default(1, { validator: positive }) rowStyleCycle?: number;
    @p style?: CssProperties;

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
            minWidth: px(this.contentWidth),
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
            minWidth: px(this.contentWidth)
        };
    }
    get spacerStyle(): CssProperties {
        return {
            height: px(this.rowHeight * this.firstIndex),
            flex: "0 0 auto"
        };
    };
    get rowStyle(): CssProperties {
        return {
            display: "flex",
            width: "100%",
            height: px(this.rowHeight)
        };
    }

    /* computed */
    get firstIndex() {
        let value = Math.floor(this.$data.scrollTop / this.rowHeight);
        if (this.rowStyleCycle > 1) {
            value -= (value % this.rowStyleCycle);
        }
        return value;
    }
    get lastIndex() {
        const {scrollTop, bodyHeight} = this.$data;
        return Math.ceil((scrollTop + bodyHeight) / this.rowHeight);
    }
    get renderedItems() {
        return this.items.slice(this.firstIndex, this.lastIndex + 1);
    }
    get contentHeight() {
        return this.rowHeight * this.items.length;
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
    };
    onScroll(event: Event) {
        const { scrollLeft, scrollTop } = this.$refs.scrollable;
        const args: ScrollEventArgs = { scrollLeft, scrollTop };
        this.$data.scrollLeft = scrollLeft;
        this.$data.scrollTop = scrollTop;
        this.$emit("scroll", args);
    }
    onRowClick(item: any, index: number, event: Event) {
        this.$emit("row-click", { item, index, event });
    }

    @watch("contentHeight")
    onContentHeightChanged(newValue, oldValue) {
        const hScrollBarHeight = this.$data.hScrollBarHeight;
        const height = this.$data.bodyHeight + hScrollBarHeight;
        if ((0 < hScrollBarHeight) === (newValue < height)) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }

    @watch("contentWidth")
    onContentWidthChanged(newValue, oldValue) {
        const vScrollBarWidth = this.$data.vScrollBarWidth;
        const width = this.$data.bodyWidth + vScrollBarWidth;
        if ((0 < vScrollBarWidth) === (newValue < width)) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }

}
