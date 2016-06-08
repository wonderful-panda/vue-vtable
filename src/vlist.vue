<template>
    <div class="vlist-container" :style="[$options.style.container, style]">
        <div v-if="headerComponent" class="vlist-header-row" :style="$options.style.header(minWidth, scrollLeft)">
            <component :is="headerComponent" :row-height="rowHeight" :ctx="ctx">
            </component>
        </div>
        <div v-el:scrollable class="vlist-scrollable" :style="$options.style.scrollable" @scroll="recalcRenderRange">
            <resize-sensor @resized="recalcRenderRange"></resize-sensor>
            <div class="vlist-body" :style="$options.style.body(minWidth, rowHeight, items.length)">
                <div class="vlist-spacer" :style="$options.style.spacer(rowHeight, firstRenderedIndex)"></div>
                <div class="vlist-row" v-for="item in renderedItems" :style="$options.style.row(rowHeight)">
                    <component :is="rowComponent" :item="item" :index="$index + firstRenderedIndex" :height="rowHeight" :ctx="ctx">
                    </component>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        components: {
            resizeSensor: require("vue-resizesensor")
        },
        props: {
            style: { default: () => ({}) },
            headerComponent: {},
            rowComponent: { require: true },
            bufferRows: { type: Number, default: 20 },
            rowHeight: { type: Number, require: true, validator: v => v > 0 },
            items: { type: Array, require: true },
            minWidth: {},
            ctx: {}
        },
        style: {
            container: { display: "flex", flexFlow: "column nowrap", overflow: "hidden" },
            scrollable: { overflow: "auto", position: "relative", flex: "1 1 0px" },
            header(minWidth, scrollLeft) {
                return {
                    display: "flex",
                    flex: "0 0 auto",
                    boxSizing: "border-box",
                    minWidth,
                    position: "relative",
                    left: `${scrollLeft * -1}px`,
                    overflow: "hidden"
                };
            },
            body(minWidth, rowHeight, itemCount) {
                return {
                    display: "flex",
                    flexFlow: "column nowrap",
                    flex: "1 1 auto",
                    boxSizing: "border-box",
                    minHeight: `${rowHeight * itemCount}px`,
                    minWidth
                };
            },
            spacer(rowHeight, firstRenderedIndex) {
                return {
                    height: `${rowHeight * firstRenderedIndex}px`,
                    flex: "0 0 auto"
                };
            },
            row(rowHeight) {
                return {
                    display: "flex",
                    width: "100%",
                    height: `${rowHeight}px`
                };
            }
        },
        data() {
            return {
                scrollLeft: 0,
                scrollTop: 0,
                firstRenderedIndex: 0,
                lastRenderedIndex: 0
            };
        },
        computed: {
            renderedItems() {
                return this.items.slice(this.firstRenderedIndex, this.lastRenderedIndex + 1);
            }
        },
        methods: {
            recalcRenderRange() {
                const el = this.$els.scrollable;
                this.scrollLeft = el.scrollLeft;
                this.scrollTop = el.scrollTop;
                this.firstRenderedIndex = Math.floor(this.scrollTop / this.rowHeight);
                this.lastRenderedIndex = Math.ceil((this.scrollTop + el.clientHeight) / this.rowHeight);
            }
        },
        attached() {
            this.recalcRenderRange();
        }
    };
</script>
