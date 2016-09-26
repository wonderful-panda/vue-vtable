import * as Vue from "vue";
import * as _ from "lodash";
import { px } from "./utils";
import { VueComponent, Prop, Watch } from "vue-typescript";
import * as resizeSensor from "vue-resizesensor";
import vlist from "./vlist";
import { BodyResizeEventArgs, ScrollEventArgs } from "./vlist";
import vtablerow from "./vtablerow";

@VueComponent({
    template: require("./vtable.pug"),
    components: { vlist, vtablerow, resizeSensor }
})
export default class Vtable extends Vue {
    $els: { header: HTMLElement };

    /* props */
    @Prop({ required: true, validator: v => v > 0 }) rowHeight: number;
    @Prop headerHeight: number = 0;
    @Prop({ required: true }) columns: VtableColumn[];
    @Prop({ required: true }) items: any[];
    @Prop({ default: 1, validator: v => v > 0 }) rowStyleCycle: number;
    @Prop({ default: 3, validator: v => v > 0 }) splitterWidth: number;
    @Prop rowClass: string = "vtable-row";
    @Prop getRowClass: (item: any, index: number) => string;
    @Prop ctx: any;
    @Prop rowTrackBy: string = "$index";

    /* data */
    widths: number[] = [];
    bodyWidth: number = 0;
    bodyHeight: number = 0;
    scrollLeft: number = 0;
    contentWidth: number = 0;
    splitterPositions: number[] = [];
    draggingSplitter: number = -1;

    ready() {
        this.widths = this.columns.map(c => c.defaultWidth);
        this.contentWidth = _.sumBy(this.columns, c => c.defaultWidth + this.splitterWidth);
    }

    /* style */
    get containerStyle(): StyleObject {
        return {
            display: "flex",
            position: "relative",
            margin: 0,
            padding: 0,
            overflow: "hidden"
        };
    }
    get headerStyle(): StyleObject {
        return {
            display: "flex",
            position: "relative",
            flex: "1 1 auto",
            width: "100%",
            height: px(this.actualHeaderHeight),
            lineHeight: px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: 0,
            textWrap: "none"
        };
    }
    headerCellStyle(width: number): StyleObject {
        return {
            minWidth: px(width),
            width: px(width),
            lineHeight: px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: `0 ${this.splitterWidth}px 0 0`,
            overflow: "hidden"
        };
    }
    splitterStyle(pos) {
        const {scrollLeft, bodyWidth, bodyHeight} = this;
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
            widths: this.widths
        };
    }
    get actualHeaderHeight() {
        return this.headerHeight > 0 ? this.headerHeight : this.rowHeight;
    }

    /* methods */
    updateBodySize(args: BodyResizeEventArgs) {
        this.bodyWidth = this.$el.clientWidth - args.vScrollBarWidth;
        this.bodyHeight = this.$el.clientHeight - args.hScrollBarHeight;
    }
    @Watch("bodyWidth")
    @Watch("listCtx.widths")
    updateSplitterPositions() {
        const boundingRect = this.$el.getBoundingClientRect();
        const xoffset = boundingRect.left + this.$el.clientLeft - this.scrollLeft;
        const headerCells = this.$els.header.querySelectorAll("div.vtable-header-cell");
        this.splitterPositions = _.map(headerCells, el => el.getBoundingClientRect().right - xoffset);
    }
    updateScrollPosition(args: ScrollEventArgs) {
        this.scrollLeft = args.scrollLeft;
    }
    splitterClass(index: number) {
        if (index === this.draggingSplitter) {
            return "vtable-dragging-splitter";
        }
        else {
            return "vtable-splitter";
        }
    }
    onSplitterMouseDown(index: number, event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        const headerCell = this.$els.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.columns[index];
        const startWidth = headerCell.clientWidth;
        const startX = event.screenX;
        const minWidth = column.minWidth || 5;
        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const offset = e.screenX - startX;
            const width = Math.max(startWidth + offset, minWidth);
            this.widths.$set(index, width);
            this.contentWidth = _.sumBy(this.widths, w => w + this.splitterWidth);
            this.draggingSplitter = index;
        };
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            this.draggingSplitter = -1;
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        this.draggingSplitter = index;
    }
}
