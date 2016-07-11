import * as Vue from "vue";
import * as _ from "lodash";
import { px } from "./utils";
import { component, prop, p, pr, pd, watch } from "vueit";
import * as resizeSensor from "vue-resizesensor";
import vlist from "./vlist";
import vtablerow from "./vtablerow";

interface VtableData {
    listCtx: VtableListCtx;
    layout: {
        bodyWidth: number, bodyHeight: number, scrollLeft: number, contentWidth: number
    };
    splitter: { positions: number[], dragging: number }
}

@component({
    template: require("./vtable.jade"),
    components: { vlist, vtablerow, resizeSensor }
})
export default class Vtable extends Vue {
    $data: VtableData;
    $refs: { vlist: vlist };
    $els: { header: HTMLElement };

    /* props */
    @prop({ required: true, validator: v => v > 0 }) rowHeight: number;
    @pr columns: VtableColumn[];
    @pr items: any[];
    @prop({ default: 1, validator: v => v > 0 }) rowStyleCycle: number;
    @prop({ default: 3, validator: v => v > 0 }) splitterWidth: number;
    @pd(() => "vtable-row") getRowClass: (item: any, index: number) => string;
    @p ctx: any;

    /* data */
    data(): VtableData {
        const contentWidth = _.sumBy(this.columns, c => c.defaultWidth + this.splitterWidth);
        return {
            listCtx: {
                ctx: this.ctx,
                columns: this.columns,
                getRowClass: this.getRowClass,
                widths: this.columns.map(c => c.defaultWidth),
                splitterWidth: this.splitterWidth,
            },
            layout: { bodyWidth: 0, bodyHeight: 0, scrollLeft: 0, contentWidth },
            splitter: { positions: [], dragging: -1 }
        };
    }

    /* style */
    get containerStyle(): StyleObject {
        return {
            display: "flex", position: "relative", margin: 0, padding: 0, overflow: "hidden"
        };
    }
    get headerStyle(): StyleObject {
        return {
            display: "flex",
            position: "relative",
            flex: "1 1 auto",
            width: "100%",
            height: px(this.rowHeight),
            lineHeight: px(this.rowHeight),
            boxSizing: "border-box",
            margin: 0,
            textWrap: "none"
        };
    }
    headerCellStyle(width: number): StyleObject {
        return {
            minWidth: px(width),
            flexBasis: px(width),
            lineHeight: px(this.rowHeight),
            boxSizing: "border-box",
            margin: `0 ${this.splitterWidth}px 0 0`,
            overflow: "hidden"
        };
    }
    splitterStyle(pos) {
        const {scrollLeft, bodyWidth, bodyHeight} = this.$data.layout;
        const left = pos - scrollLeft;
        const clipLeft = left - bodyWidth;
        return {
            position: "absolute",
            top: "0px",
            left,
            width: this.splitterWidth,
            height: px(bodyHeight),
            clip: clipLeft > 0 ? `rect(${clipLeft}, 0, 0, 0)` : "auto",
            boxSizing: "border-box",
            cursor: "col-resize"
        };
    }
    /* methods */
    updateBodySize() {
        const vlistBody = this.$refs.vlist.$data.body;
        this.$data.layout.bodyWidth = this.$el.clientWidth - vlistBody.vScrollBarWidth;
        this.$data.layout.bodyHeight = this.$el.clientHeight - vlistBody.hScrollBarHeight;
        this.updateSplitterPositions();
    }
    @watch("listCtx.widths")
    updateSplitterPositions() {
        const boundingRect = this.$el.getBoundingClientRect();
        const xoffset = boundingRect.left + this.$el.clientLeft - this.$data.layout.scrollLeft;
        const headerCells = [...this.$els.header.querySelectorAll("div.vtable-header-cell")];
        this.$data.splitter.positions = headerCells.map(
            el => el.getBoundingClientRect().right - xoffset);
    }
    updateScrollPosition(position) {
        this.$data.layout.scrollLeft = position.scrollLeft;
    }
    onSplitterMouseDown(index, event) {
        const headerCell = this.$els.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.columns[index];
        const startWidth = headerCell.clientWidth;
        const startX = event.screenX;
        const minWidth = column.minWidth || 5;
        const $d = this.$data;
        const onMouseMove = e => {
            const offset = e.screenX - startX;
            const width = Math.max(startWidth + offset, minWidth);
            $d.listCtx.widths.$set(index, width);
            $d.layout.contentWidth = _.sumBy($d.listCtx.widths, w => w + this.splitterWidth);
            $d.splitter.dragging = index;
        };
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            $d.splitter.dragging = -1;
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        $d.splitter.dragging = index;
    }
}
