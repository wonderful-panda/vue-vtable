<style>
    html {
        width: 100%;
        height: 100%;
    }
    body {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
    }
    #main-list {
        flex: 1 1 0px;
    }
    .vtable-dragging-splitter {
        background-color: #ddd;
    }

</style>
<template>
    <h1>{{ message }}</h1>
    <vtable id="main-list" :items="items" :row-height="20" :columns="columns" >
    </vtable>
</template>

<script type="text/javascript">
    import Vue from "vue";
    import _ from "lodash";

    export default Vue.extend({
        components: { vtable: require("../src/vtable.vue") },
        data() {
            const items = _.range(0, 10000).map(i => ({ id: i, name: `name of ${i}` }));
            const columns = [
                { title: "id", defaultWidth: 100, value: item => item.id },
                { title: "name", defaultWidth: 100, value: item => item.name },
                { title: "description", defaultWidth: 200, value: item => `description of ${item.id}` }
            ];
            return { items, columns, message: "vue-vlist" };
        }
    });
</script>
