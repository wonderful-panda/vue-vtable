<style>
    html {
        width: 100%;
        height: 100%;
        display: flex;
        box-sizing: border-box;
    }
    body {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        align-items: stretch;
    }
    #main-list {
        flex: 1 1 auto;
    }

</style>
<template>
    <h1>{{ message }}</h1>
    <vlist id="main-list" :items="items" :header-component="$options.header" :row-component="$options.row"
        :row-height="20">
    </vlist>
</template>

<script type="text/javascript">
    import Vue from "vue";
    const vlist = require("../src/vlist.vue");
    const header = Vue.extend({ template: "<div>this is header</div>" });
    const row = Vue.extend({ template: "<div>this is row {{ item }}</div>", props: ["item"] });

    export default Vue.extend({
        components: { vlist },
        header: Vue.extend({ template: "<div>this is header</div>" }),
        row: Vue.extend({ template: "<div>this is row {{ item }}</div>", props: ["item"] }),
        data() {
            const items = [];
            for (let i = 0; i < 10000; ++i) {
                items.push(i);
            }
            return { items, message: "vue-vlist" };
        }
    });
</script>
