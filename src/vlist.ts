import * as Vue from "vue";
import { StyleObject } from "../types";
import * as resizeSensor from "vue-resizesensor";
import VueComponent from "vue-class-component";
import { px } from "./utils";
import { positive } from "./validation";

export interface ScrollEventArgs {
    scrollLeft: number;
    scrollTop: number;
}

interface VlistProps {
    rowComponent: any;
    items: any[];
    getItemKey: (item: any) => number | string;
    contentWidth?: number | string;
    ctx?: any;
    rowHeight: number;
    rowStyleCycle?: number;
    style?: StyleObject;
}

interface VlistData {
    scrollLeft: number;
    scrollTop: number;
    bodyWidth: number;
    bodyHeight: number;
    vScrollBarWidth: number;
    hScrollBarHeight: number;
}

const required = true;
const { render, staticRenderFns } = require("./vlist.pug");

type C = Vue & Vlist & VlistProps;

@VueComponent<C>({
    render,
    staticRenderFns,
    components: { resizeSensor },
    props: {
        rowComponent: { required },
        items: { type: Array, required },
        getItemKey: { type: Function, required },
        contentWidth: { type: [Number, String] },
        ctx: {},
        rowHeight: { type: Number, required, validator: positive },
        rowStyleCycle: { type: Number, default: 1, validator: positive },
        style: { type: Object, default: () => ({}) },
    },
    data(): VlistData {
        return {
            scrollLeft: 0,
            scrollTop: 0,
            bodyWidth: 0,
            bodyHeight: 0,
            vScrollBarWidth: 0,
            hScrollBarHeight: 0
        };
    },
    watch: {
        contentHeight: function(this: C, newValue, oldValue) {
            const hScrollBarHeight = this.$data.hScrollBarHeight;
            const height = this.$data.bodyHeight + hScrollBarHeight;
            if ((0 < hScrollBarHeight) === (newValue < height)) {
                // must re-check scrollbar visibilities
                this.updateBodySize();
            }
        },
        contentWidth: function(this: C, newValue, oldValue) {
            const vScrollBarWidth = this.$data.vScrollBarWidth;
            const width = this.$data.bodyWidth + vScrollBarWidth;
            if ((0 < vScrollBarWidth) === (newValue < width)) {
                // must re-check scrollbar visibilities
                this.updateBodySize();
            }
        }
    }
})
export default class Vlist extends Vue {
    $data: VlistData;
    $refs: { scrollable: Element, content: Element };

    /* styles */
    get containerStyle(this: C): StyleObject {
        return {
            display: "flex",
            flexFlow: "column nowrap",
            overflow: "hidden"
        };
    }
    get headerStyle(this: C): StyleObject {
        return {
            display: "flex",
            flex: "0 0 auto",
            boxSizing: "border-box",
            minWidth: this.contentWidth,
            position: "relative",
            left: px(this.$data.scrollLeft * -1),
            overflow: "hidden",
            padding: `0 ${px(this.$data.vScrollBarWidth)} 0 0`
        };
    }
    get scrollableStyle(this: C) {
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
    get contentStyle(this: C): StyleObject {
        return {
            display: "flex",
            flexFlow: "column nowrap",
            flex: "1 1 auto",
            position: "relative",
            boxSizing: "border-box",
            height: px(this.contentHeight),
            overflow: "hidden",
            minWidth: this.contentWidth
        };
    }
    get spacerStyle(this: C): StyleObject {
        return {
            height: px(this.rowHeight * this.firstIndex),
            flex: "0 0 auto"
        };
    };
    get rowStyle(this: C): StyleObject {
        return {
            display: "flex",
            width: "100%",
            height: px(this.rowHeight)
        };
    }

    /* computed */
    get firstIndex(this: C) {
        let value = Math.floor(this.$data.scrollTop / this.rowHeight);
        if (this.rowStyleCycle > 1) {
            value -= (value % this.rowStyleCycle);
        }
        return value;
    }
    get lastIndex(this: C) {
        const {scrollTop, bodyHeight} = this.$data;
        return Math.ceil((scrollTop + bodyHeight) / this.rowHeight);
    }
    get renderedItems(this: C) {
        return this.items.slice(this.firstIndex, this.lastIndex + 1);
    }
    get contentHeight(this: C) {
        return this.rowHeight * this.items.length;
    }

    /* methods */
    updateBodySize(this: C) {
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
    onScroll(this: C, event: Event) {
        const { scrollLeft, scrollTop } = this.$refs.scrollable;
        const args: ScrollEventArgs = { scrollLeft, scrollTop };
        this.$data.scrollLeft = scrollLeft;
        this.$data.scrollTop = scrollTop;
        this.$emit("scroll", args);
    }
    onRowClick(this: C, item: any, index: number, event: Event) {
        this.$emit("row-click", { item, index, event });
    }
}
