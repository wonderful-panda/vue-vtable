import { Vlist } from "./vlist";
import { Vtable } from "./vtable";
import { Vtreetable } from "./vtreetable";

export function vlistOf<T extends object>(): new (...args: any[]) => Vlist<T> {
    return Vlist;
}
export function vtableOf<T extends object>(): new (...args: any[]) => Vtable<T> {
    return Vtable;
}
export function vtreetableOf<T extends object>(): new (...args: any[]) => Vtreetable<T> {
    return Vtreetable;
}

export { Vlist } from "./vlist";
export { Vtable } from "./vtable";
export { Vtreetable, ExpandableCell } from "./vtreetable";
export * from "../types";
