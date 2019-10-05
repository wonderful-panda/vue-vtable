import { storiesOf } from "@storybook/vue";
import Vue, { VNode } from "vue";
import { vtableOf, VtableColumn } from "../..";
import _ from "lodash";

interface Item {
  id: string;
  checked: boolean;
}

const Vtable = vtableOf<Item>();

storiesOf("Vtable", module).add("Example", () => {
  const items: ReadonlyArray<Item> = Object.freeze(
    _.range(1, 1001).map(i => ({
      id: i.toString(),
      checked: false
    }))
  );
  const columns: ReadonlyArray<VtableColumn> = Object.freeze([
    {
      id: "id",
      defaultWidth: 150
    },
    {
      id: "name",
      defaultWidth: 200
    },
    {
      id: "description",
      className: "cell-end",
      defaultWidth: 600
    }
  ]);

  return Vue.extend({
    name: "Example",
    data() {
      return {
        selectedIndex: -1
      };
    },
    methods: {
      getRowClass(_item: Item, index: number): string {
        if (this.selectedIndex == index) {
          return "vtable-row-selected";
        } else {
          return "vtable-row";
        }
      },
      renderCell(item: Item, columnId: string): string | (VNode | string)[] {
        switch (columnId) {
          case "id":
            return [<input type="checkbox" v-model={item.checked} />, item.id];
          default:
            return `${columnId}-${item.id}`;
        }
      }
    },
    render(): VNode {
      return (
        <Vtable
          style="width: 80vw; height: 80vh; border: 1px solid gray"
          items={items}
          columns={columns}
          rowHeight={20}
          getRowClass={this.getRowClass}
          rowStyleCycle={2}
          getItemKey={item => item.id}
          scopedSlots={{
            cell: ({ item, columnId }) => this.renderCell(item, columnId)
          }}
          onRowclick={e => {
            this.selectedIndex = e.index;
          }}
        />
      );
    }
  });
});
