import { Vlist } from "./vlist";
import { Vtable } from "./vtable";

export function vlistOf<T>(): new (...args: any[]) => Vlist<T> {
    return Vlist;
}
export function vtableOf<T>(): new (...args: any[]) => Vtable<T> {
    return Vtable;
}

export { Vlist } from "./vlist";
export { Vtable } from "./vtable";
export * from "../types";
