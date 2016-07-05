<template>
    <div class="vlist-container" :style="[containerStyle, style]">
        <div class="vlist-header-row" v-if="hasHeader" :style="headerStyle">
            <slot name="header"></slot>
        </div>
        <div v-el:scrollable class="vlist-scrollable" :style="scrollableStyle" @scroll="onScroll">
            <resize-sensor @resized="updateBodySize">
            </resize-sensor>
            <div class="vlist-body" :style="bodyStyle">
                <div :style="spacerStyle">
                </div>
                <div class="vlist-row" v-for="item in renderedItems" track-by="$index" :style="rowStyle"
                    @click="$emit('row-click', {item: item, index: $index + firstIndex, event: $event})">
                    <component :is="rowComponent" :item="item" :index="$index + firstIndex"
                        :height="rowHeight" :ctx="ctx">
                    </component>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import { px } from "./utils";
    export default {
        components: {
            resizeSensor: require("vue-resizesensor")
        },
        props: {
            style: { default: () => ({}) },
            rowComponent: { require: true },
            rowHeight: { type: Number, require: true, validator: v => v > 0 },
            items: { type: Array, require: true },
            rowStyleCycle: { type: Number, default: 1, validator: v => v > 0 },
            minWidth: {},
            ctx: {}
        },
        data() {
            return {
                scrollLeft: 0,
                scrollTop: 0,
                firstIndex: 0,
                lastIndex: 0,
                bodySize: {
                    width: 0,
                    height: 0,
                    vScrollBarWidth: 0,
                    hScrollBarHeight: 0
                },
                hasHeader: true
            };
        },
        computed: {
            renderedItems() {
                return this.items.slice(this.firstIndex, this.lastIndex + 1);
            },
            containerStyle() {
                return {
                    display: "flex",
                    flexFlow: "column nowrap",
                    overflow: "hidden"
                };
            },
            headerStyle() {
                return {
                    display: "flex",
                    flex: "0 0 auto",
                    boxSizing: "border-box",
                    minWidth: this.minWidth,
                    position: "relative",
                    left: px(this.scrollLeft * -1),
                    overflow: "hidden",
                    paddingRight: px(this.bodySize.vScrollBarWidth)
                };
            },
            scrollableStyle() {
                return {
                    overflow: "auto",
                    position: "relative",
                    flex: "1 1 0px"
                };
            },
            bodyStyle() {
                return {
                    display: "flex",
                    flexFlow: "column nowrap",
                    flex: "1 1 auto",
                    position: "relative",
                    boxSizing: "border-box",
                    minHeight: px(this.rowHeight * this.items.length),
                    minWidth: this.minWidth
                };
            },
            spacerStyle() {
                return {
                    height: px(this.rowHeight * this.firstIndex),
                    flex: "0 0 auto"
                };
            },
            rowStyle() {
                return {
                    display: "flex",
                    width: "100%",
                    height: px(this.rowHeight)
                };
            }
        },
        methods: {
            updateBodySize() {
                const el = this.$els.scrollable;
                const bound = el.getBoundingClientRect();
                const width = el.clientWidth;
                const height = el.clientHeight;
                const vScrollBarWidth = bound.width - el.clientWidth - el.clientLeft;
                const hScrollBarHeight = bound.height - el.clientHeight - el.clientTop;
                let changed = false;
                if (this.bodySize.width !== width) {
                    this.bodySize.width = width;
                    changed = true;
                }
                if (this.bodySize.height !== height) {
                    this.bodySize.height = height;
                    changed = true;
                }
                if (this.bodySize.vScrollBarWidth !== vScrollBarWidth) {
                    this.bodySize.vScrollBarWidth = vScrollBarWidth;
                    changed = true;
                }
                if (this.bodySize.hScrollBarHeight !== hScrollBarHeight) {
                    this.bodySize.hScrollBarHeight = hScrollBarHeight;
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
            },
            updateRenderRange() {
                const el = this.$els.scrollable;
                this.scrollLeft = el.scrollLeft;
                this.scrollTop = el.scrollTop;
                let firstIndex = Math.floor(this.scrollTop / this.rowHeight);
                if (this.rowStyleCycle > 1) {
                    firstIndex -= (firstIndex % this.rowStyleCycle);
                }
                this.firstIndex = firstIndex;
                this.lastIndex = Math.ceil((this.scrollTop + el.clientHeight) / this.rowHeight);
            },
            onScroll(event) {
                this.updateRenderRange();
                this.$emit("scroll", {
                    scrollLeft: event.target.scrollLeft,
                    scrollTop: event.target.scrollTop
                });
            }
        },
        watch: {
            rowHeight: "updateRenderRange"
        },
        attached() {
            this.hasHeader = (this.$el.querySelector("[slot=header]") != null);
        }
    };
</script>
