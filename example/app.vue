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
        border: 1px #888 solid;
    }
    .vlist-header-row {
        background-color: #bbf;
        border-bottom: 1px #888 solid;
    }
    .vtable-row-selected {
        font-weight: bold;
    }
    .vlist-row:hover {
        background-color: #ddf;
    }
    .vtable-splitter {
        border-right: 1px #888 solid;
    }
    .vtable-dragging-splitter {
        background-color: #aaf;
    }
    .vtable-cell, .vtable-header-cell {
        padding: 0 0.2em;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .cell-desc {
        flex: 1 1 auto;
    }

</style>
<template>
    <h1>{{ message }}</h1>
    <div style="margin-bottom: 1em;">
        <span>Row height: </span>
        <input type="number" :value="rowHeight"
            @keyup.enter="rowHeight = parseInt($event.target.value)"></input>
        <span>Row count: </span>
        <input type="number" :value="rowCount"
            @keyup.enter="rowCount = parseInt($event.target.value)"></input>
    </div>
    <vtable id="main-list"
        :items="items"
        :row-height="rowHeight"
        :columns="columns"
        :get-row-class="getRowClass"
        @row-click="onRowClick">
    </vtable>
</template>

<script type="text/javascript">
    import Vue from "vue";
    import _ from "lodash";

    export default Vue.extend({
        components: { vtable: require("../src/vtable.vue") },
        data() {
            const columns = [
                {
                    title: "id",
                    className: "cell-id",
                    defaultWidth: 100,
                    value: item => item.id
                },
                {
                    title: "name",
                    className: "cell-name",
                    defaultWidth: 100,
                    value: item => item.name
                },
                {
                    title: "description",
                    className: "cell-desc",
                    defaultWidth: 200,
                    value: item => `description of ${item.id}`
                }
            ];
            return {
                columns,
                rowHeight: 20,
                rowCount: 50,
                message: "vtable demo",
                selectedIndex: -1
            };
        },
        computed: {
            items() {
                return _.range(1, this.rowCount + 1).map(i => ({ id: i, name: `name of ${i}` }));
            }
        },
        methods: {
            onRowClick(args) {
                this.selectedIndex = args.index;
            },
            getRowClass(item, index) {
                return index === this.selectedIndex ? "vtable-row-selected" : "vtable-row";
            }
        }
    });
</script>
