import * as _ from "lodash";
import { component } from "vueit";
import { vtable, VtableColumn } from "../..";

interface AppData {
    columns: VtableColumn[];
    rowHeight: number;
    rowCount: number;
    message: string;
    selectedIndex: number;
}

@component({
    template: require("./app.html"),
    components: { vtable }
})
export default class App {
    $data: AppData;

    data(): AppData {
        const columns = [
            {
                title: "id",
                className: "cell-id",
                defaultWidth: 200,
                value: item => item.id
            },
            {
                title: "name",
                className: "cell-name",
                defaultWidth: 200,
                value: item => item.name
            },
            {
                title: "description",
                className: "cell-desc",
                defaultWidth: 300,
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
    }
    get items() {
        return _.range(1, this.$data.rowCount + 1).map(i => ({ id: i, name: `name of ${i}` }));
    }
    onRowClick(args) {
        this.$data.selectedIndex = args.index;
    }
    getRowClass(item, index) {
        return index === this.$data.selectedIndex ? "vtable-row-selected" : "vtable-row";
    }
}
