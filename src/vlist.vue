<template>
    <div class="vlist-container" :style="[$options.style.container, style]">
        <div v-if="headerComponent" class="vlist-header-row" :style="$options.style.header(minWidth, scrollLeft, scrollbarWidth)">
            <component :is="headerComponent" :height="rowHeight" :ctx="ctx">
            </component>
        </div>
        <div v-el:scrollable class="vlist-scrollable" :style="$options.style.scrollable" @scroll="recalcRenderRange">
            <resize-sensor @resized="recalcRenderRange"></resize-sensor>
            <div class="vlist-body" :style="$options.style.body(minWidth, rowHeight, items.length)">
                <div class="vlist-spacer" :style="$options.style.spacer(rowHeight, firstIndex)"></div>
                <div class="vlist-row" v-for="item in renderedItems" track-by="$index"
                    :style="$options.style.row(rowHeight)"
                    @click="$emit('row-click', {item: item, index: $index + firstIndex, event: $event})">
                    <component :is="rowComponent" :item="item" :index="$index + firstIndex" :height="rowHeight" :ctx="ctx">
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
            headerComponent: {},
            rowComponent: { require: true },
            rowHeight: { type: Number, require: true, validator: v => v > 0 },
            items: { type: Array, require: true },
            minWidth: {},
            ctx: {}
        },
        style: {
            container: { display: "flex", flexFlow: "column nowrap", overflow: "hidden" },
            scrollable: {
                overflow: "auto",
                position: "relative",
                flex: "1 1 0px"
            },
            header(minWidth, scrollLeft, scrollbarWidth) {
                return {
                    display: "flex",
                    flex: "0 0 auto",
                    boxSizing: "border-box",
                    minWidth,
                    position: "relative",
                    left: px(scrollLeft * -1),
                    overflow: "hidden",
                    paddingRight: px(scrollbarWidth)
                };
            },
            body(minWidth, rowHeight, itemCount) {
                return {
                    display: "flex",
                    flexFlow: "column nowrap",
                    flex: "1 1 auto",
                    boxSizing: "border-box",
                    minHeight: px(rowHeight * itemCount),
                    minWidth
                };
            },
            spacer(rowHeight, firstIndex) {
                return {
                    height: px(rowHeight * firstIndex),
                    flex: "0 0 auto"
                };
            },
            row(rowHeight) {
                return {
                    display: "flex",
                    width: "100%",
                    height: px(rowHeight)
                };
            }
        },
        data() {
            return {
                scrollLeft: 0,
                scrollTop: 0,
                firstIndex: 0,
                lastIndex: 0,
                scrollbarWidth: 0
            };
        },
        computed: {
            renderedItems() {
                return this.items.slice(this.firstIndex, this.lastIndex + 1);
            }
        },
        methods: {
            recalcRenderRange() {
                const el = this.$els.scrollable;
                this.scrollLeft = el.scrollLeft;
                this.scrollTop = el.scrollTop;
                this.firstIndex = Math.floor(this.scrollTop / this.rowHeight);
                this.lastIndex = Math.ceil((this.scrollTop + el.clientHeight) / this.rowHeight);
                this.scrollbarWidth = el.getBoundingClientRect().width - el.clientWidth;
            }
        },
        watch: {
            rowHeight: "recalcRenderRange"
        },
        attached() {
            this.recalcRenderRange();
        }
    };
</script>
