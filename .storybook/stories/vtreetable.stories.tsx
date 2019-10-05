import { storiesOf } from "@storybook/vue";
import Vue, { VNode } from "vue";
import {
  vtreetableOf,
  Vtreetable,
  TreeNode,
  TreeNodeWithState,
  VtableColumn,
  ExpandableCell
} from "../..";
import packageJson from "../../package.json";

interface Item {
  id: string;
  key: string;
  value: string;
}

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

const VtreetableT = vtreetableOf<Item>();

storiesOf("Vtreetable", module).add("Example", () => {
  const items = convertJsonToItemTree(packageJson, "root/");
  const columns: ReadonlyArray<VtableColumn> = Object.freeze([
    {
      id: "index",
      title: "*",
      defaultWidth: 50
    },
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
  ]);

  return Vue.extend({
    name: "Example",
    data() {
      return {
        selectedKey: null as string | null
      };
    },
    mounted() {
      (this.$refs.tree as Vtreetable<Item>).expandAll();
    },
    methods: {
      toggleExpand(data: Item) {
        (this.$refs.tree as Vtreetable<Item>).toggleExpand(data);
      },
      getRowClass(item: TreeNodeWithState<Item>): string {
        return item.data.id === this.selectedKey
          ? "vtable-row-selected"
          : "vtable-row";
      },
      renderCell(
        item: TreeNodeWithState<Item>,
        columnId: string,
        index: number
      ) {
        switch (columnId) {
          case "key":
            return (
              <ExpandableCell nodeState={item}>{item.data.key}</ExpandableCell>
            );
          case "index":
            return index.toString();
          case "value":
            return item.data.value;
          default:
            return "";
        }
      }
    },
    render(): VNode {
      return (
        <VtreetableT
          ref="tree"
          style="width: 80vw; height: 80vh; border: 1px solid gray"
          rootNodes={items}
          columns={columns}
          rowHeight={20}
          indentWidth={12}
          getRowClass={this.getRowClass}
          rowStyleCycle={2}
          getItemKey={item => item.id}
          scopedSlots={{
            cell: ({ item, index, columnId }) =>
              this.renderCell(item, columnId, index)
          }}
          onRowclick={e => {
            this.selectedKey = e.item.data.key;
          }}
          onRowdblclick={e => {
            this.toggleExpand(e.item.data);
          }}
        />
      );
    }
  });
});
