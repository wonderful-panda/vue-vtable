import Vue, { VNode, VNodeChildrenArrayContents, VueConstructor } from "vue";
import { CssProperties } from "vue-css-definition";
import p from "vue-strict-prop";
import * as tsx from "vue-tsx-support";
import {
  GetClassFunction,
  GetKeyFunction,
  TreeNode,
  TreeNodeWithState,
  VtableColumn,
  VtableEvents,
  VtableEventsOn,
  VtableSlotCellProps
} from "../types";
import { px } from "./utils";
import { VtableBase } from "./vtablebase";
import { Component, Prop } from "vue-property-decorator";
import { DeclareAutoProps } from "./tsx-util";

const m = tsx.modifiers;
export interface VtreeTableData {
  expandMap: { [key: string]: boolean };
}

const ExpandButton = tsx.component(
  {
    name: "ExpandButton",
    functional: true,
    props: {
      expanded: p(Boolean).required,
      size: p(Number).required
    },
    render(_h, { props }): VNode {
      const { expanded, size } = props;
      const transform = `rotate(${expanded ? 90 : 0}deg)`;
      const transition = "0.1s transform ease";
      const style = { transform, transition };
      return (
        <svg class="vtreetable-button" width={size} height={size} style={style}>
          <polygon
            transform={`translate(${size / 2}, ${size / 2})`}
            points="-1,-4 3,0 -1,4"
          />
        </svg>
      );
    }
  },
  ["expanded", "size"]
);

export const ExpandableCell = tsx.component(
  {
    name: "ExpandableCell",
    inject: ["toggleExpand", "indentWidth"],
    props: {
      nodeState: p.ofObject<TreeNodeWithState<any>>().required
    },
    render() {
      const { data, children, level, expanded } = this.nodeState;
      const { toggleExpand, indentWidth } = this as any;
      const indent = px(level * indentWidth);
      const expandButtonStyle: CssProperties = {
        marginLeft: indent,
        marginRight: "4px",
        marginTop: "auto",
        marginBottom: "auto",
        textAlign: "center",
        minWidth: "12px",
        cursor: "pointer"
      };

      return (
        <div style={{ display: "flex" }}>
          <div
            style={expandButtonStyle}
            onClick={m.stop.prevent(() => toggleExpand(data))}
          >
            {children ? (
              <ExpandButton expanded={expanded} size={12} />
            ) : (
              undefined
            )}
          </div>
          {this.$slots.default}
        </div>
      );
    }
  },
  ["nodeState"]
);

@Component({
  provide(this: Vtreetable<any>) {
    return {
      toggleExpand: this.toggleExpand,
      indentWidth: this.indentWidth || this.rowHeight
    };
  }
})
export class Vtreetable<T> extends Vue {
  $scopedSlots!: tsx.InnerScopedSlots<{
    cell: VtableSlotCellProps<TreeNodeWithState<T>>;
  }>;

  @Prop(Number) rowHeight!: number;
  @Prop(Number) headerHeight?: number;
  @Prop(Number) indentWidth!: number;
  @Prop(Array) columns!: ReadonlyArray<VtableColumn>;
  @Prop(Array) rootNodes!: ReadonlyArray<TreeNode<T>>;
  @Prop({ type: Number, default: 1 })
  rowStyleCycle?: number;

  @Prop({ type: Number, default: 3 })
  splitterWidth?: number;

  @Prop(String) rowClass?: string;
  @Prop(Function) getRowClass?: GetClassFunction<TreeNodeWithState<T>>;
  @Prop(Function) getItemKey!: GetKeyFunction<T>;
  @Prop(Object) widths?: Record<string, number>;
  @Prop({ type: Number, default: 8 })
  overscan?: number;

  _tsx!: DeclareAutoProps<
    Vtreetable<T>,
    Vue,
    "toggleExpand" | "expandAll" | "collapseAll" | "expandAllDescendants"
  > &
    tsx.DeclareOn<VtableEvents<TreeNodeWithState<T>>> &
    tsx.DeclareOnEvents<VtableEventsOn<TreeNodeWithState<T>>>;

  private expandMap = {} as Record<string, boolean>;

  private get flattenVisibleItems(): ReadonlyArray<TreeNodeWithState<T>> {
    const ret = [] as Array<TreeNodeWithState<T>>;
    this.rootNodes.forEach(root =>
      this.addDescendentVisibleItems(root, 0, ret)
    );
    return ret;
  }

  private get itemCount(): number {
    return this.flattenVisibleItems.length;
  }

  private addDescendentVisibleItems(
    parent: TreeNode<T>,
    level: number,
    arr: Array<TreeNodeWithState<T>>
  ) {
    const key = this.getItemKey(parent.data).toString();
    const expanded = !!this.expandMap[key];
    arr.push({ ...parent, expanded, level });
    if (!expanded || !parent.children) {
      return;
    }
    for (const child of parent.children) {
      this.addDescendentVisibleItems(child, level + 1, arr);
    }
  }

  private sliceItems(
    start: number,
    end: number
  ): ReadonlyArray<TreeNodeWithState<T>> {
    return this.flattenVisibleItems.slice(start, end);
  }

  private getItemKey_({ data }: TreeNodeWithState<T>): string | number {
    return this.getItemKey(data);
  }

  toggleExpand(data: T) {
    const expandMap = this.$data.expandMap;
    const key = this.getItemKey(data).toString();
    const newValue = !expandMap[key];
    if (newValue) {
      Vue.set(expandMap, key, true);
    } else {
      Vue.delete(expandMap, key);
    }
  }

  expandAll() {
    for (const root of this.rootNodes) {
      this.expandAllDescendants(root);
    }
  }

  expandAllDescendants(from: TreeNode<T>) {
    const expandMap = this.expandMap;
    const key = this.getItemKey(from.data).toString();
    Vue.set(expandMap, key, true);
    if (from.children) {
      for (const child of from.children) {
        this.expandAllDescendants(child);
      }
    }
  }

  collapseAll() {
    this.expandMap = {};
  }

  render(): VNode {
    const VtableBaseT = VtableBase as new () => VtableBase<
      TreeNodeWithState<T>
    >;
    return (
      <VtableBaseT
        itemCount={this.itemCount}
        sliceItems={this.sliceItems}
        rowHeight={this.rowHeight}
        headerHeight={this.headerHeight || this.rowHeight}
        columns={this.columns}
        splitterWidth={this.splitterWidth}
        rowStyleCycle={this.rowStyleCycle}
        rowClass={this.rowClass}
        getRowClass={this.getRowClass}
        getItemKey={this.getItemKey_}
        widths={this.widths}
        overscan={this.overscan}
        on={this.$listeners}
        scopedSlots={this.$scopedSlots}
      />
    );
  }
}
