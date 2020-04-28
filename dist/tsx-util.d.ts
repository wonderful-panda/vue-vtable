import Vue from "vue";
import { DeclareProps, AutoProps } from "vue-tsx-support";
export declare type DeclareAutoProps<V extends Parent, Parent extends Vue = Vue, Excludes extends keyof AutoProps<V, Parent> = never> = DeclareProps<Omit<AutoProps<V, Parent>, Excludes>>;
