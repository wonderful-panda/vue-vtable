import * as Vue from "vue";
import * as types from "./types";

declare namespace VueVtable {
    export var Vlist: Vue;
    export var Vtable: Vue;
    export type VtableColumn = types.VtableColumn;
    export type VtableProps = types.VtableProps;
    export type VlistProps = types.VlistProps;
}

export = VueVtable;
