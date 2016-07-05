<template>
    <div class="vtable-container" :style="containerStyle()">
        <vlist v-ref:vlist :style="{ flex: '1 1 auto' }" :row-height="rowHeight"
            :header-component="$options.components.vtableheader"
            :row-component="$options.components.vtablerow"
            :items="items"
            :row-style-cycle="rowStyleCycle"
            :min-width="minWidth"
            :ctx="listCtx"
            @scroll="updateScrollPosition",
            @body-resize="updateBodySize"
            @row-click="$emit('row-click', $arguments[0])">

            <!-- header -->
            <div slot="header" v-el:header class="vtable-header" :style="headerStyle()">
                <resize-sensor @resized="updateBodySize">
                </resize-sensor>
                <div v-for="c in columns"
                     :class="['vtable-header-cell', c.className]"
                     :style="headerCellStyle(listCtx.widths[$index])">
                    {{ c.title }}
                </div>
            </div>
        </vlist>
        <div v-for="pos in splitterPositions"
             :class="$index === draggingSplitter ? 'vtable-dragging-splitter' : 'vtable-splitter'"
             :style="splitterStyle(pos)"
             @mousedown="onSplitterMouseDown($index, $event)">
        </div>
    </div>
</template>

<script type="text/javascript">
    import Vue from "vue";
    import _ from "lodash";
    import { px } from "./utils";
    export default Vue.extend({
        components: {
            vlist: require("./vlist.vue"),
            vtablerow: require("./vtablerow.vue"),
            resizeSensor: require("vue-resizesensor")

        },
        props: {
            rowHeight: { type: Number, require: true, validator: v => v > 0 },
            columns: { type: Array, require: true },
            items: { type: Array, require: true },
            rowStyleCycle: { type: Number, default: 1, validator: v => v > 0 },
            splitterWidth: { type: Number, default: 3, validator: v => v > 0 },
            getRowClass: { type: Function, default: () => "vtable-row" },
            ctx: {}
        },
        data() {
            const minWidth = _.sumBy(this.columns, c => c.defaultWidth + this.splitterWidth);
            return {
                listCtx: {
                    ctx: this.ctx,
                    columns: this.columns,
                    getRowClass: this.getRowClass,
                    widths: this.columns.map(c => c.defaultWidth),
                    splitterWidth: this.splitterWidth,
                },
                layout: {
                    bodyWidth: 0,
                    bodyHeight: 0,
                    scrollLeft: 0
                },
                splitterPositions: [],
                draggingSplitter: -1,
                minWidth: px(minWidth)
            };
        },
        methods: {
            containerStyle() {
                return {
                    display: "flex",
                    position: "relative",
                    margin: 0,
                    padding: 0,
                    overflow: "hidden"
                };
            },
            headerStyle() {
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
            },
            headerCellStyle(width) {
                return {
                    minWidth: px(width),
                    flexBasis: px(width),
                    lineHeight: px(this.rowHeight),
                    boxSizing: "border-box",
                    margin: `0 ${this.splitterWidth}px 0 0`,
                    overflow: "hidden"
                };
            },
            splitterStyle(pos) {
                const left = pos - this.layout.scrollLeft;
                const clipLeft = left - this.layout.bodyWidth;
                return {
                    position: "absolute",
                    top: "0px",
                    left,
                    width: this.splitterWidth,
                    height: px(this.layout.bodyHeight),
                    clip: clipLeft > 0 ? `rect(${clipLeft}, 0, 0, 0)` : "auto",
                    boxSizing: "border-box",
                    cursor: "col-resize"
                };
            },
            updateBodySize() {
                const vlistBodySize = this.$refs.vlist.bodySize;
                this.layout.bodyWidth = this.$el.clientWidth - vlistBodySize.vScrollBarWidth;
                this.layout.bodyHeight = this.$el.clientHeight - vlistBodySize.hScrollBarHeight;
                this.updateSplitterPositions();
            },
            updateScrollPosition(position) {
                this.layout.scrollLeft = position.scrollLeft;
            },
            updateSplitterPositions() {
                const boundingRect = this.$el.getBoundingClientRect();
                const xoffset = boundingRect.left + this.$el.clientLeft - this.layout.scrollLeft;
                const header = this.$els.header;
                const headerCells = [...header.querySelectorAll("div.vtable-header-cell")];
                this.splitterPositions = headerCells.map(
                        el => el.getBoundingClientRect().right - xoffset);
            },
            onSplitterMouseDown(index, event) {
                const header = this.$els.header;
                const headerCell = header.querySelectorAll("div.vtable-header-cell")[index];
                const column = this.columns[index];
                const startWidth = headerCell.clientWidth;
                const startX = event.screenX;
                const minWidth = column.minWidth || 5;
                const onMouseMove = e => {
                    const offset = e.screenX - startX;
                    const width = Math.max(startWidth + offset, minWidth);
                    this.listCtx.widths.$set(index, width);
                    this.minWidth = _.sumBy(this.listCtx.widths, w => w + this.splitterWidth);
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
        },
        watch: {
            "listCtx.widths": "updateSplitterPositions"
        }
    });
</script>
