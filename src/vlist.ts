import * as Vue from "vue";
import * as resizeSensor from "vue-resizesensor";
import { VueComponent, Prop, Watch } from "vue-typescript";
import { px } from "./utils";

export interface ScrollEventArgs {
    scrollLeft: number;
    scrollTop: number;
}

@VueComponent({
    template: require("./vlist.pug"),
    components: { resizeSensor }
})
export default class Vlist extends Vue {
    $els: { scrollable: HTMLElement, content: HTMLElement };

    /* props */
    @Prop({ required: true }) rowComponent: any;
    @Prop({ required: true }) items: any[];
    @Prop contentWidth: number | string;
    @Prop ctx: any;

    @Prop({ required: true, validator: v => v > 0 }) rowHeight: number;
    @Prop({ default: 1, validator: v => v > 0 }) rowStyleCycle: number;
    @Prop({ default: () => ({}) }) style: any;
    @Prop({ default: "$index" }) rowTrackBy: string;

    /* data */
    scrollLeft: number = 0;
    scrollTop: number = 0;
    bodyWidth: number = 0;
    bodyHeight: number = 0;
    vScrollBarWidth: number = 0;
    hScrollBarHeight: number = 0;
    hasHeader: boolean = true;

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
            minWidth: this.contentWidth,
            position: "relative",
            left: px(this.scrollLeft * -1),
            overflow: "hidden",
            padding: `0 ${px(this.vScrollBarWidth)} 0 0`
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
            height: px(this.contentHeight),
            overflow: "hidden",
            minWidth: this.contentWidth
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
        let value = Math.floor(this.scrollTop / this.rowHeight);
        if (this.rowStyleCycle > 1) {
            value -= (value % this.rowStyleCycle);
        }
        return value;
    }
    get lastIndex() {
        return Math.ceil((this.scrollTop + this.bodyHeight) / this.rowHeight);
    }
    get renderedItems() {
        return this.items.slice(this.firstIndex, this.lastIndex + 1);
    }
    get contentHeight() {
        return this.rowHeight * this.items.length;
    }

    /* methods */
    @Watch("contentHeight")
    contentHeightChanged(newValue, oldValue) {
        const hScrollBarHeight = this.hScrollBarHeight;
        const height = this.bodyHeight + hScrollBarHeight;
        if ((0 < hScrollBarHeight) === (newValue < height)) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }
    @Watch("contentWidth")
    contentWidthChanged(newValue, oldValue) {
        const vScrollBarWidth = this.vScrollBarWidth;
        const width = this.bodyWidth + vScrollBarWidth;
        if ((0 < vScrollBarWidth) === (newValue < width)) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }
    updateBodySize() {
        const sc = this.$els.scrollable;
        const bound = sc.getBoundingClientRect();
        const bodyWidth = sc.clientWidth;
        const bodyHeight = sc.clientHeight;
        const vScrollBarWidth = Math.floor(bound.width - bodyWidth);
        const hScrollBarHeight = Math.floor(bound.height - bodyHeight);
        if (this.bodyWidth !== bodyWidth ||
            this.bodyHeight !== bodyHeight ||
            this.vScrollBarWidth !== vScrollBarWidth ||
            this.hScrollBarHeight !== hScrollBarHeight) {

            this.bodyWidth = bodyWidth;
            this.bodyHeight = bodyHeight;
            this.vScrollBarWidth = vScrollBarWidth;
            this.hScrollBarHeight = hScrollBarHeight;
        }
    };
    onScroll(event: Event) {
        const { scrollLeft, scrollTop } = this.$els.scrollable;
        const args: ScrollEventArgs = { scrollLeft, scrollTop };
        this.scrollLeft = scrollLeft;
        this.scrollTop = scrollTop;
        this.$emit("scroll", args);
    }
    onRowClick(item: any, index: number, event: Event) {
        this.$emit("row-click", { item, index, event });
    }

    attached() {
        this.hasHeader = (this.$el.querySelector("[slot=header]") != null);
    }
}
