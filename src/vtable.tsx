import Vue, { VNode } from "vue";
import { Prop, Component } from "vue-property-decorator";
import {
  GetClassFunction,
  GetKeyFunction,
  VtableColumn,
  VtableSlotCellProps,
  VtableEvents,
  VtableEventsOn
} from "../types";
import { VtableBase } from "./vtablebase";
import {
  InnerScopedSlots,
  DeclarePropsFromAllPublicMembers,
  DeclareOn,
  DeclarePrefixedEvents
} from "vue-tsx-support";

@Component
export class Vtable<T> extends Vue {
  $refs!: { base: VtableBase<T> };
  $scopedSlots!: InnerScopedSlots<{ cell: VtableSlotCellProps<T> }>;
  _tsx!: DeclarePropsFromAllPublicMembers<Vtable<T>, Vue, "ensureVisible"> &
    DeclareOn<VtableEvents<T>> &
    DeclarePrefixedEvents<VtableEventsOn<T>>;

  @Prop(Number) rowHeight!: number;
  @Prop(Number) headerHeight?: number;
  @Prop(Array) columns!: ReadonlyArray<VtableColumn>;
  @Prop(Array) items!: ReadonlyArray<T>;
  @Prop({ type: Number, default: 1 })
  rowStyleCycle?: number;

  @Prop({ type: Number, default: 3 })
  splitterWidth?: number;

  @Prop(String) rowClass?: string;
  @Prop(Function) getRowClass?: GetClassFunction<T>;
  @Prop(Function) getItemKey!: GetKeyFunction<T>;
  @Prop(Object) widths?: Record<string, number>;
  @Prop({ type: Number, default: 8 })
  overscan?: number;

  /* methods */
  ensureVisible(index: number) {
    this.$refs.base.ensureVisible(index);
  }

  private sliceItems(start: number, end: number): ReadonlyArray<T> {
    return this.items.slice(start, end);
  }

  render(): VNode {
    const VtableBaseT = VtableBase as new () => VtableBase<T>;
    return (
      <VtableBaseT
        ref="base"
        itemCount={this.items.length}
        sliceItems={this.sliceItems}
        rowHeight={this.rowHeight}
        headerHeight={this.headerHeight || this.rowHeight}
        columns={this.columns}
        splitterWidth={this.splitterWidth}
        rowStyleCycle={this.rowStyleCycle}
        rowClass={this.rowClass}
        getRowClass={this.getRowClass}
        getItemKey={this.getItemKey}
        widths={this.widths}
        overscan={this.overscan}
        on={this.$listeners}
        scopedSlots={this.$scopedSlots}
      />
    );
  }
}
