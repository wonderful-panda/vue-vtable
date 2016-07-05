<template>
    <div :class="ctx.getRowClass(item, index)" :style="rowStyle()">
        <div v-for="c in ctx.columns" :class="['vtable-cell', c.className]" :style="cellStyle(ctx.widths[$index])">
            <component v-if="c.component" :is="c.component"
                :item="item" :index="$index" :ctx="ctx.ctx">
            </component>
            <template v-if="!c.component">
                {{ c.value(item, $index, ctx.ctx) }}
            </template>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Vue from "vue";
    import { px } from "./utils";
    export default Vue.extend({
        name: "vtablerow",
        props: {
            item: { require: true },
            index: { type: Number, require: true },
            height: { type: Number, require: true, validator: v => v > 0 },
            ctx: { require: true }
        },
        methods: {
            rowStyle() {
                return {
                    display: "flex",
                    flex: "1 1 auto",
                    width: "100%",
                    height: px(this.height),
                    lineHeight: px(this.height),
                    boxSizing: "border-box",
                    margin: 0
                };
            },
            cellStyle(width) {
                return {
                    minWidth: px(width),
                    flexBasis: px(width),
                    lineHeight: px(this.height),
                    margin: `0 ${this.ctx.splitterWidth}px 0 0`,
                    boxSizing: "border-box",
                    overflow: "hidden"
                };
            }
        },
        style: {
            row(height) {
                return {
                    display: "flex",
                    flex: "1 1 auto",
                    width: "100%",
                    height: px(height),
                    lineHeight: px(height),
                    boxSizing: "border-box",
                    margin: 0
                };
            },
            cell(width, height) {
                return {
                    minWidth: px(width),
                    flexBasis: px(width),
                    lineHeight: px(height),
                    boxSizing: "border-box",
                    margin: 0,
                    overflow: "hidden"
                };
            }
        }
    });
</script>
