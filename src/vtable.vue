<template>
    <div class="vtable-container" :style="$options.style.container">
        <vlist :style="{ flex: '1 1 auto' }" :row-height="rowHeight"
            :header-component="$options.components.vtableheader"
            :row-component="$options.components.vtablerow"
            :items="items"
            :row-style-cycle="rowStyleCycle"
            :min-width="minWidth"
            :ctx="listCtx"
            @row-click="$emit('row-click', $arguments[0])">

            <!-- Grid header -->
            <div slot="header" class="vtable-header" :style="$options.style.header(rowHeight)">
                <template v-for="c in columns">
                    <div :class="['vtable-header-cell', c.className]"
                         :style="$options.style.headercell(rowHeight, listCtx.widths[$index])">
                        {{ c.title }}
                    </div>
                    <splitter :index="$index"
                        :width="splitterWidth"
                        :dragging="$index == listCtx.draggingSplitter"
                        :hover="$index == listCtx.hoverSplitter"
                        :callback="splitterCallback"
                        :hover-callback="splitterHoverCallback">
                    </splitter>
                </template>
            </div>
        </vlist>
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
            splitter: require("./vtablesplitter.vue")
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
        style: {
            container: {
                display: "flex",
                margin: 0,
                padding: 0
            },
            header(height) {
                return {
                    display: "flex",
                    flex: "1 1 auto",
                    width: "100%",
                    height: px(height),
                    lineHeight: px(height),
                    boxSizing: "border-box",
                    margin: 0,
                    textWrap: "none"
                };
            },
            headercell(height, width) {
                return {
                    minWidth: px(width),
                    flexBasis: px(width),
                    lineHeight: px(height),
                    boxSizing: "border-box",
                    margin: 0,
                    overflow: "hidden"
                };
            }
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
                    draggingSplitter: -1,
                    hoverSplitter: -1,
                    splitterCallback: this.splitterCallback,
                    splitterHoverCallback: this.splitterHoverCallback
                },
                minWidth: px(minWidth)
            };
        },
        methods: {
            splitterCallback(index, width) {
                this.listCtx.draggingSplitter = index;
                if (index >= 0) {
                    this.listCtx.widths.$set(index, width);
                    const minWidth = _.sumBy(this.listCtx.widths, w => w + this.splitterWidth);
                    this.minWidth = px(minWidth);
                }
            },
            splitterHoverCallback(index) {
                this.listCtx.hoverSplitter = index;
            }
        }
    });
</script>
