import * as Vue from "vue";
import * as _ from "lodash";
import { px } from "./utils";
import { component, prop, p, pr, pd, watch } from "vueit";
import * as resizeSensor from "vue-resizesensor";
import vlist from "./vlist";
import { BodyResizeEventArgs, ScrollEventArgs } from "./vlist";
import vtablerow from "./vtablerow";

interface VtableData {
    widths: number[];
    bodyWidth: number;
    bodyHeight: number;
    scrollLeft: number;
    contentWidth: number;
    splitterPositions: number[],
    draggingSplitter: number
}

@component({
    template: require("./vtable.html"),
    components: { vlist, vtablerow, resizeSensor }
})
export default class Vtable extends Vue {
    $data: VtableData;
    $els: { header: HTMLElement };

    /* props */
    @prop({ required: true, validator: v => v > 0 }) rowHeight: number;
    @pr columns: VtableColumn[];
    @pr items: any[];
    @prop({ default: 1, validator: v => v > 0 }) rowStyleCycle: number;
    @prop({ default: 3, validator: v => v > 0 }) splitterWidth: number;
    @pd("vtable-row") rowClass: string;
    @p getRowClass: (item: any, index: number) => string;
    @p ctx: any;

    /* data */
    data(): VtableData {
        const contentWidth = _.sumBy(this.columns, c => c.defaultWidth + this.splitterWidth);
        return {
            widths: this.columns.map(c => c.defaultWidth),
            bodyWidth: 0, bodyHeight: 0, scrollLeft: 0, contentWidth,
            splitterPositions: [], draggingSplitter: -1
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
            width: px(width),
            lineHeight: px(this.rowHeight),
            boxSizing: "border-box",
            margin: `0 ${this.splitterWidth}px 0 0`,
            overflow: "hidden"
        };
    }
    splitterStyle(pos) {
        const {scrollLeft, bodyWidth, bodyHeight} = this.$data;
        const left = pos - scrollLeft;
        const clipR = left - bodyWidth;
        return {
            position: "absolute",
            top: "0px",
            left,
            width: this.splitterWidth,
            height: px(bodyHeight),
            clip: clipR > 0 ? `rect(${clipR}px, 0, 0, 0)` : "auto",
            boxSizing: "border-box",
            cursor: "col-resize"
        };
    }
    /** ctx object will be passed to vlist */
    get listCtx(): VtableListCtx {
        const rowClass = this.rowClass;
        return {
            ctx: this.ctx,
            columns: this.columns,
            getRowClass: this.getRowClass ? this.getRowClass : (item, index) => rowClass,
            splitterWidth: this.splitterWidth,
            widths: this.$data.widths
        };
    }

    /* methods */
    updateBodySize(args: BodyResizeEventArgs) {
        this.$data.bodyWidth = this.$el.clientWidth - args.vScrollBarWidth;
        this.$data.bodyHeight = this.$el.clientHeight - args.hScrollBarHeight;
        Vue.nextTick(() => this.updateSplitterPositions());
    }
    @watch("listCtx.widths")
    updateSplitterPositions() {
        const boundingRect = this.$el.getBoundingClientRect();
        const xoffset = boundingRect.left + this.$el.clientLeft - this.$data.scrollLeft;
        const headerCells = this.$els.header.querySelectorAll("div.vtable-header-cell");
        this.$data.splitterPositions = _.map(headerCells, el => el.getBoundingClientRect().right - xoffset);
    }
    updateScrollPosition(args: ScrollEventArgs) {
        this.$data.scrollLeft = args.scrollLeft;
    }
    onSplitterMouseDown(index, event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        const headerCell = this.$els.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.columns[index];
        const startWidth = headerCell.clientWidth;
        const startX = event.screenX;
        const minWidth = column.minWidth || 5;
        const $d = this.$data;
        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const offset = e.screenX - startX;
            const width = Math.max(startWidth + offset, minWidth);
            $d.widths.$set(index, width);
            $d.contentWidth = _.sumBy($d.widths, w => w + this.splitterWidth);
            $d.draggingSplitter = index;
        };
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            $d.draggingSplitter = -1;
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        $d.draggingSplitter = index;
    }
}
