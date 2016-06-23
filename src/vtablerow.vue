<template>
    <div class="vtable-row" :style="$options.style.row(height)">
        <template v-for="c in ctx.columns">
            <div class="vtable-cell" :style="$options.style.cell(ctx.widths[$index], height)">
                <component v-if="c.component" :is="c.component"
                    :item="item" :index="$index" :ctx="ctx.ctx">
                </component>
                <template v-if="!c.component">
                    {{ c.value(item, $index, ctx.ctx) }}
                </template>
            </div>
            <splitter :index="$index" :width="ctx.splitterWidth" :dragging="$index == ctx.draggingSplitter"
                :callback="ctx.splitterCallback"></splitter>
        </template>
    </div>
</template>

<script type="text/javascript">
    import Vue from "vue";
    import { px } from "./utils";
    export default Vue.extend({
        name: "vtablerow",
        components: { splitter: require("./vtablesplitter.vue") },
        props: {
            item: { require: true },
            index: { type: Number, require: true },
            height: { type: Number, require: true, validator: v => v > 0 },
            ctx: { require: true }
        },
        style: {
            row(height) {
                return {
                    display: "flex",
                    flex: "1 1 auto",
                    width: "100%",
                    height: px(height),
                    lineHeight: px(height)
                };
            },
            cell(width, height) {
                return {
                    minWidth: px(width),
                    flexBasis: px(width),
                    lineHeight: px(height),
                    overflow: "hidden"
                };
            }
        }
    });
</script>
