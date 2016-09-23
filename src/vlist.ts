import * as Vue from "vue";
import * as _ from "lodash";
import * as resizeSensor from "vue-resizesensor";
import { component, prop, p, pr, pd } from "vueit";
import { px } from "./utils";

interface VlistData {
    scrollLeft: number;
    scrollTop: number;
    bodyWidth: number;
    bodyHeight: number;
    vScrollBarWidth: number;
    hScrollBarHeight: number;
    hasHeader: boolean;
}

export interface BodyResizeEventArgs {
    bodyWidth: number;
    bodyHeight: number;
    vScrollBarWidth: number;
    hScrollBarHeight: number;
}

export interface ScrollEventArgs {
    scrollLeft: number;
    scrollTop: number;
}

@component({
    template: require("./vlist.html"),
    components: { resizeSensor }
})
export default class Vlist extends Vue {
    $data: VlistData;
    $els: { scrollable: HTMLElement, content: HTMLElement };

    /* props */
    @pr rowComponent: any;
    @pr items: any[];
    @p minWidth: number | string;
    @p ctx: any;

    @prop({ required: true, validator: v => v > 0 }) rowHeight: number;
    @prop({ default: 1, validator: v => v > 0 }) rowStyleCycle: number;
    @pd(() => ({})) style: any;
    @pd("$index") rowTrackBy: string;

    /* data */
    data(): VlistData {
        return {
            scrollLeft: 0, scrollTop: 0, bodyWidth: 0, bodyHeight: 0,
            vScrollBarWidth: 0, hScrollBarHeight: 0, hasHeader: true
        };
    }

    /* styles */
    get containerStyle(): StyleObject {
        return {
            display: "flex",
            flexFlow: "column nowrap",
            overflow: "hidden"
        };
    }
    get headerStyle(): StyleObject {
        return {
            display: "flex",
            flex: "0 0 auto",
            boxSizing: "border-box",
            minWidth: this.minWidth,
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
    get contentStyle(): StyleObject {
        return {
            display: "flex",
            flexFlow: "column nowrap",
            flex: "1 1 auto",
            position: "relative",
            boxSizing: "border-box",
            height: px(this.rowHeight * this.items.length),
            overflow: "hidden",
            minWidth: this.minWidth
        };
    }
    get spacerStyle(): StyleObject {
        return {
            height: px(this.rowHeight * this.firstIndex),
            flex: "0 0 auto"
        };
    };
    get rowStyle(): StyleObject {
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
        return Math.ceil((this.$data.scrollTop + this.$data.bodyHeight) / this.rowHeight);
    }
    get renderedItems() {
        return this.items.slice(this.firstIndex, this.lastIndex + 1);
    }

    /* methods */
    contentSizeChanged() {
        const { bodyWidth, bodyHeight, vScrollBarWidth, hScrollBarHeight } = this.$data;
        const c = this.$els.content;
        const contentWidth = c.clientWidth;
        const contentHeight = c.clientHeight;
        if (0 < vScrollBarWidth && contentWidth < bodyWidth + vScrollBarWidth ||
              vScrollBarWidth <= 0 && bodyWidth < contentWidth ||
                0 < hScrollBarHeight && contentHeight < bodyHeight + hScrollBarHeight ||
                  hScrollBarHeight <= 0 && bodyHeight < contentHeight) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }
    updateBodySize() {
        const data = this.$data;
        const sc = this.$els.scrollable;
        const bound = sc.getBoundingClientRect();
        const bodyWidth = sc.clientWidth;
        const bodyHeight = sc.clientHeight;
        const vScrollBarWidth = Math.floor(bound.width - bodyWidth);
        const hScrollBarHeight = Math.floor(bound.height - bodyHeight);
        if (data.bodyWidth !== bodyWidth ||
            data.bodyHeight !== bodyHeight ||
            data.vScrollBarWidth !== vScrollBarWidth ||
            data.hScrollBarHeight !== hScrollBarHeight) {

            const args: BodyResizeEventArgs = {
                bodyWidth,
                bodyHeight,
                vScrollBarWidth,
                hScrollBarHeight
            };
            _.assign(data, args);
            this.$emit("body-resize", args);
        }
    };
    onScroll(event: Event) {
        const { scrollLeft, scrollTop } = this.$els.scrollable;
        const args: ScrollEventArgs = { scrollLeft, scrollTop };
        _.assign(this.$data, args);
        this.$emit("scroll", args);
    }
    onRowClick(item: any, index: number, event: Event) {
        this.$emit("row-click", { item, index, event });
    }

    attached() {
        this.$data.hasHeader = (this.$el.querySelector("[slot=header]") != null);
    }
}
