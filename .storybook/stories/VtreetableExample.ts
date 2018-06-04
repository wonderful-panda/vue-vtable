import { Vtreetable, VtableColumn, VtableEvents, TreeNode, TreeNodeWithState } from "../..";
import _c from "vue-component-marker";

interface Item {
    id: string;
    key: string;
    value: string;
}

// tslint:disable-next-line: no-var-requires
const json = require("../../package-lock.json");
function convertJsonToItemTree(data: object, prefix: string): TreeNode<Item>[] {
    return Object.keys(data).map(key => {
        const value = (data as any)[key];
        const id = prefix + key;
        if (value instanceof Object) {
            const children = convertJsonToItemTree(value, id + "/");
            return { data: { id, key, value: "" }, children };
        } else {
            return { data: { id, key, value } };
        }
    });
}

export const VtreetableExample = _c({
    name: "VtreetableExample",
    // tslint:disable-next-line: no-var-requires
    template: require("./VtreetableExample.html"),
    data() {
        return {
            selectedKey: null as string | null,
            columns: [
                {
                    id: "key",
                    className: "cell-id",
                    defaultWidth: 200
                },
                {
                    id: "value",
                    className: "cell-end",
                    defaultWidth: 200
                }
            ] as VtableColumn[],
            roots: convertJsonToItemTree(json, "root/")
        };
    },
    mounted() {
        this.toggleExpand(this.roots[0].data);
    },
    methods: {
        toggleExpand(data: Item) {
            (this.$refs.tree as Vtreetable<Item>).toggleExpand(data);
        },
        onRowClick(args: VtableEvents<TreeNodeWithState<Item>>["rowclick"]) {
            this.selectedKey = args.item.data.id;
        },
        onRowDblclick(args: VtableEvents<TreeNodeWithState<Item>>["rowdblclick"]) {
            this.toggleExpand(args.item.data);
        },
        getRowClass(item: TreeNodeWithState<Item>): string {
            return item.data.id === this.selectedKey ? "vtable-row-selected" : "vtable-row";
        },
        getItemKey(item: Item): string {
            return item.id;
        }
    }
});