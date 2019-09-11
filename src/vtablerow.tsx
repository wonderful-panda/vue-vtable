import * as _ from "lodash";
import Vue, { VNode } from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as tsx from "vue-tsx-support";
import { CssProperties } from "vue-css-definition";
import * as t from "../types";
import { px } from "./utils";

@Component
export class VtableRow<T> extends Vue {
  @Prop({ required: true })
  item!: T;
  @Prop({ type: Array, required: true })
  columns!: ReadonlyArray<t.VtableColumn>;
  @Prop({ type: Object, required: true })
  columnWidths!: Record<string, number>;
  @Prop({ type: Number, required: true, validator: v => v >= 0 })
  index!: number;
  @Prop({ type: Number, required: true, validator: v => v > 0 })
  height!: number;

  _tsx!: tsx.ExposeAllPublicMembers<VtableRow<T>, Vue>;

  $scopedSlots!: tsx.InnerScopedSlots<{
    splitter: { index: number };
    cell: t.VtableSlotCellProps<T>;
  }>;

  private get rowStyle(): CssProperties {
    return {
      display: "flex",
      flex: "1 1 auto",
      width: "100%",
      height: px(this.height),
      lineHeight: px(this.height),
      boxSizing: "border-box",
      margin: 0
    };
  }

  private cellStyle(width: number): CssProperties {
    const w = px(width);
    return {
      minWidth: w,
      width: w,
      lineHeight: px(this.height),
      margin: 0,
      boxSizing: "border-box",
      overflow: "hidden"
    };
  }

  private get cells() {
    const { item, columns, columnWidths, index } = this;
    return columns.map((c, columnIndex) => [
      <div
        staticClass="vtable-cell"
        class={c.className}
        style={this.cellStyle(columnWidths[c.id] || c.defaultWidth)}
      >
        {this.$scopedSlots.cell({ index, item, columnId: c.id })}
      </div>,
      this.$scopedSlots.splitter({ index: columnIndex })
    ]);
  }

  render(): VNode {
    return <div style={this.rowStyle}>{this.cells}</div>;
  }
}
