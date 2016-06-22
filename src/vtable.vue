<template>
    <div class="vtable-container" :style="$options.style.container">
        <vlist :style="{ flex: '1 1 auto' }" :row-height="rowHeight"
            :header-component="$options.components.vtableheader"
            :row-component="$options.components.vtablerow"
            :items="items" :min-width="minWidth" :ctx="listCtx">
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
            vtableheader: require("./vtableheader.vue"),
            vtablerow: require("./vtablerow.vue")
        },
        props: {
            rowHeight: { type: Number, require: true, validator: v => v > 0 },
            columns: { type: Array, require: true },
            items: { type: Array, require: true },
            splitterWidth: { type: Number, default: 2, validator: v => v > 0 },
            getRowClass: { type: Function, default: () => "vtable-row" },
            ctx: {}
        },
        style: {
            container: { display: "flex", margin: 0, padding: 0 },
        },
        data() {
            const minWidth = _.sumBy(this.columns, c => c.defaultWidth + this.splitterWidth);
            return {
                listCtx: {
                    ctx: this.ctx,
                    columns: this.columns,
                    getRowClass: this.getRowClass,
                    widths: this.columns.map(c => c.defaultWidth),
                    draggingSplitter: -1,
                    splitterCallback: this.splitterCallback
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
            }
        }
    });
</script>
