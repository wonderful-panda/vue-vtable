import * as Vue from "vue";
import * as types from "./types";

declare namespace VueVtable {
    export var Vlist: Vue;
    export var Vtable: Vue;
    export type VtableColumn<T> = types.VtableColumn<T>;
    export type VtableProps<T> = types.VtableProps<T>;
    export type VlistProps<T> = types.VlistProps<T>;
}

export = VueVtable;
