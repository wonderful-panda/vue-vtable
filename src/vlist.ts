import * as Vue from "vue";
import * as resizeSensor from "vue-resizesensor";
import { component, prop, p, pr, pd, watch } from "vueit";
import { px } from "./utils";

interface VlistData {
    scroll: { left: number, top: number };
    range: { first: number, last: number };
    body: { width: number, height: number, vScrollBarWidth: number, hScrollBarHeight: number };
    hasHeader: boolean;
}

@component({
    template: require("./vlist.html"),
    components: { resizeSensor }
})
export default class Vlist extends Vue {
    $data: VlistData;
    $els: { scrollable: HTMLElement };

    /* props */
    @pr rowComponent: any;
    @pr items: any[];
    @p minWidth: number | string;
    @p ctx: any;

    @prop({ required: true, validator: v => v > 0 }) rowHeight: number;
    @prop({ default: 1, validator: v => v > 0 }) rowStyleCycle: number;
    @pd(() => ({})) style: any;

    /* data */
    data(): VlistData {
        return {
            scroll: { left: 0, top: 0 },
            range: { first: 0, last: 0 },
            body: { width: 0, height: 0, vScrollBarWidth: 0, hScrollBarHeight: 0 },
            hasHeader: true
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
            left: px(this.$data.scroll.left * -1),
            overflow: "hidden",
            padding: `0 ${px(this.$data.body.vScrollBarWidth)} 0 0`
        };
    }
    get scrollableStyle() {
        return {
            overflow: "auto",
            position: "relative",
            flex: "1 1 0px"
        };
    }
    get bodyStyle(): StyleObject {
        return {
            display: "flex",
            flexFlow: "column nowrap",
            flex: "1 1 auto",
            position: "relative",
            boxSizing: "border-box",
            minHeight: px(this.rowHeight * this.items.length),
            minWidth: this.minWidth
        };
    }
    get spacerStyle(): StyleObject {
        return {
            height: px(this.rowHeight * this.$data.range.first),
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
    get renderedItems() {
        const range = this.$data.range;
        return this.items.slice(range.first, range.last + 1);
    }

    /* methods */
    updateBodySize() {
        const body = this.$data.body;
        const el = this.$els.scrollable;
        const bound = el.getBoundingClientRect();
        const width = el.clientWidth;
        const height = el.clientHeight;
        const vScrollBarWidth = bound.width - width - el.clientLeft;
        const hScrollBarHeight = bound.height - height - el.clientTop;
        let changed = false;
        if (body.width !== width) {
            body.width = width;
            changed = true;
        }
        if (body.height !== height) {
            body.height = height;
            changed = true;
        }
        if (body.vScrollBarWidth !== vScrollBarWidth) {
            body.vScrollBarWidth = vScrollBarWidth;
            changed = true;
        }
        if (body.hScrollBarHeight !== hScrollBarHeight) {
            body.hScrollBarHeight = hScrollBarHeight;
            changed = true;
        }
        if (changed) {
            this.updateRenderRange();
            this.$emit("body-resize", {
                width,
                height,
                vScrollBarWidth,
                hScrollBarHeight
            });
        }
    };
    updateRenderRange() {
        const el = this.$els.scrollable;
        const {scroll, range} = this.$data;
        scroll.left = el.scrollLeft;
        scroll.top = el.scrollTop;
        let firstIndex = Math.floor(scroll.top / this.rowHeight);
        if (this.rowStyleCycle > 1) {
            firstIndex -= (firstIndex % this.rowStyleCycle);
        }
        range.first = firstIndex;
        range.last = Math.ceil((scroll.top + el.clientHeight) / this.rowHeight);
    };
    onScroll(event) {
        this.updateRenderRange();
        this.$emit("scroll", {
            scrollLeft: event.target.scrollLeft,
            scrollTop: event.target.scrollTop
        });
    }
    onRowClick(item: any, index: number, event: Event) {
        this.$emit('row-click', { item, index, event });
    }

    attached() {
        this.$data.hasHeader = (this.$el.querySelector("[slot=header]") != null);
    }
}
