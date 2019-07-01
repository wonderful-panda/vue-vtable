import Vue from "vue";
import Component from "vue-class-component";
import { EmitWithoutPrefix as Emit } from "vue-tsx-support/lib/decorator";
import {
  RowClickEventArgs,
  RowDragEventArgs,
  ScrollEventArgs,
  VlistEvents
} from "../types";
import { tsxkey, ExposeAllPublicMembers } from "vue-tsx-support";

@Component
export class VlistEventsMixin<T> extends Vue {
  [tsxkey]!: ExposeAllPublicMembers<
    VlistEventsMixin<T>,
    Vue,
    never,
    | "onRowclick"
    | "onRowdblclick"
    | "onRowcontextmenu"
    | "onRowdragenter"
    | "onRowdragleave"
    | "onRowdragstart"
    | "onRowdragend"
    | "onRowdragover"
    | "onRowdrop"
    | "onScroll"
  >;
  @Emit
  onRowclick(_arg: RowClickEventArgs<T>) {}
  @Emit
  onRowdblclick(_payload: RowClickEventArgs<T>) {}
  @Emit
  onRowcontextmenu(_payload: RowClickEventArgs<T>) {}
  @Emit
  onRowdragenter(_payload: RowDragEventArgs<T>) {}
  @Emit
  onRowdragleave(_payload: RowDragEventArgs<T>) {}
  @Emit
  onRowdragstart(_payload: RowDragEventArgs<T>) {}
  @Emit
  onRowdragend(_payload: RowDragEventArgs<T>) {}
  @Emit
  onRowdragover(_payload: RowDragEventArgs<T>) {}
  @Emit
  onRowdrop(_payload: RowDragEventArgs<T>) {}
  @Emit
  onScroll(_payload: ScrollEventArgs) {}
}
