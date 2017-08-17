import * as tc from "vue-typed-component";
import * as types from "./types";

declare namespace VueVtable {
    export type VtableColumn<T> = types.VtableColumn<T>;
    export type VtableProps<T> = types.VtableProps<T>;
    export type VtableEvents<T> = types.VtableEvents<T>;
    export type VlistProps<T> = types.VlistProps<T>;
    export type VlistEvents<T> = types.VlistEvents<T>;
    export class Vlist<T> extends tc.EvTypedComponent<VlistProps<T>, VlistEvents<T>> {
    }
    export class Vtable<T> extends tc.EvTypedComponent<VtableProps<T>, VtableEvents<T>> {
    }
}

export = VueVtable;
