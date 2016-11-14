import * as Vue from "vue"

type $createElement = typeof Vue.prototype.$createElement;

export interface VtableColumn<T> {
    title: string;
    defaultWidth: number;
    minWidth?: number;
    className?: string;
    render?: (h: $createElement, item: T, index: number, ctx: any) => Vue.VNode|string;
}

export interface VtableListCtx<T> {
    ctx: any;
    columns: VtableColumn<T>[],
    getRowClass: (item: T, index: number) => string;
    widths: number[];
    splitterWidth: number;
    draggingSplitter: number;
    onSplitterMouseDown: (index: number, event: MouseEvent) => void;
}

export interface StyleObject {
    bottom?: string;
    boxSizing?: "border-box" | "content-box";
    cursor?: string;
    display?: string;
    flex?: string;
    flexBasis?: string;
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
    flexFlow?: string;
    flexGrow?: number;
    flexShrink?: number;
    flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
    height?: string;
    left?: string;
    lineHeight?: string;
    margin?: number | string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
    overflow?: "auto" | "scroll" | "hidden" | "visible";
    padding?: number | string;
    position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
    right?: string;
    textWrap?: "normal" | "none" | "unrestricted" | "suppress",
    top?: string;
    width?: string;
}

export interface VtableProps<T> {
    rowHeight: number;
    headerHeight?: number;
    columns: VtableColumn<T>[];
    items: T[];
    rowStyleCycle?: number;
    splitterWidth?: number;
    rowClass?: string;
    getRowClass?: (item: T, index: number) => string;
    ctx?: any;
    getItemKey: (item: T) => number | string;
}

export interface VlistProps<T> {
    rowComponent: string | Vue;
    items: T[];
    getItemKey: (item: T) => number | string;
    contentWidth?: number | string;
    ctx?: any;
    rowHeight: number;
    rowStyleCycle?: number;
    style?: StyleObject;
}

