<template>
    <div class="vtable-header" :style="$options.style.row(height)">
        <template v-for="c in ctx.columns">
            <div class="vtable-header-cell" :style="$options.style.cell($index, height, ctx)">
                {{ c.title }}
            </div>
            <splitter :index="$index" :width="ctx.splitterWidth" :dragging="$index == ctx.draggingSplitter"
                :callback="ctx.splitterCallback"></splitter>
        </template>
    </div>
</template>

<script type="text/javascript">
    import Vue from "vue";
    export default Vue.extend({
        name: "vtableheader",
        components: { splitter: require("./vtablesplitter.vue") },
        props: {
            height: { type: Number, require: true, validator: v => v > 0 },
            ctx: { require: true }
        },
        style: {
            row(height) {
                return {
                    display: "flex",
                    flex: "1 1 auto",
                    width: "100%",
                    height: `${height}px`,
                    lineHeight: `${height}px`,
                    textWrap: "none"
                };
            },
            cell(index, height, ctx) {
                const w = `${ctx.widths[index]}px`;
                return {
                    minWidth: w,
                    flexBasis: w,
                    lineHeight: `${height}px`,
                    overflow: "hidden"
                };
            }
        }
    });
</script>
