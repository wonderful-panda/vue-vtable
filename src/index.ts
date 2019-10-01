import { Vlist } from "./vlist";
import { Vtable } from "./vtable";
import { Vtreetable } from "./vtreetable";
import { VueConstructor } from "vue";

export function vlistOf<T>(): VueConstructor<Vlist<T>> {
  return Vlist as any;
}
export function vtableOf<T>(): VueConstructor<Vtable<T>> {
  return Vtable as any;
}
export function vtreetableOf<T>(): VueConstructor<Vtreetable<T>> {
  return Vtreetable as any;
}

export { Vlist } from "./vlist";
export { Vtable } from "./vtable";
export { Vtreetable, ExpandableCell } from "./vtreetable";
export * from "../types";
