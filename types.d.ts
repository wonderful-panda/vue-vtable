import * as Vue from "vue"
import { CssProperties } from "vue-css-definition";

export interface VtableColumn<T> {
    title: string;
    defaultWidth: number;
    minWidth?: number;
    className?: string;
    render: (h: Vue.CreateElement, item: T, index: number, ctx: any) => Vue.VNode|string;
}

export interface VtableListCtx<T> {
    ctx?: any;
    columns: VtableColumn<T>[] | ReadonlyArray<VtableColumn<T>>,
    getRowClass: (item: T, index: number) => string;
    widths: number[];
    splitterWidth: number;
    draggingSplitter: number;
    onSplitterMouseDown: (index: number, event: MouseEvent) => void;
}

export interface VtableProps<T> {
    rowHeight: number;
    headerHeight?: number;
    columns: VtableColumn<T>[] | ReadonlyArray<VtableColumn<T>>;
    items: T[] | ReadonlyArray<T>;
    rowStyleCycle?: number;
    splitterWidth?: number;
    rowClass?: string;
    getRowClass?: (item: T, index: number) => string;
    ctx?: any;
    getItemKey: (item: T) => number | string;
}

export interface VlistProps<T> {
    rowComponent: string | Vue.Component;
    items: T[] | ReadonlyArray<T>;
    getItemKey: (item: T) => number | string;
    contentWidth?: number | string;
    ctx?: any;
    rowHeight: number;
    rowStyleCycle?: number;
}

export interface RowEventArgs<T, TEvent> {
    index: number;
    item: T;
    event: TEvent;
}

export type RowClickEventArgs<T> = RowEventArgs<T, MouseEvent>;
export type RowDragEventArgs<T> = RowEventArgs<T, DragEvent>;

export interface ScrollEventArgs {
    scrollLeft: number;
    scrollTop: number;
    event: Event;
}

export interface VlistEvents<T> {
    rowclick: RowClickEventArgs<T>;
    rowdblclick: RowClickEventArgs<T>;
    rowdragenter: RowDragEventArgs<T>;
    rowdragleave: RowDragEventArgs<T>;
    rowdragstart: RowDragEventArgs<T>;
    rowdragend: RowDragEventArgs<T>;
    rowdragover: RowDragEventArgs<T>;
    rowdrop: RowDragEventArgs<T>;
    scroll: ScrollEventArgs;
}

export interface VlistEventsOn<T> {
    onRowclick: RowClickEventArgs<T>;
    onRowdblclick: RowClickEventArgs<T>;
    onRowdragenter: RowDragEventArgs<T>;
    onRowdragleave: RowDragEventArgs<T>;
    onRowdragstart: RowDragEventArgs<T>;
    onRowdragend: RowDragEventArgs<T>;
    onRowdragover: RowDragEventArgs<T>;
    onRowdrop: RowDragEventArgs<T>;
    onScroll: ScrollEventArgs;
}

export interface VtableEvents<T> {
    rowclick: RowClickEventArgs<T>;
    rowdblclick: RowClickEventArgs<T>;
    rowdragenter: RowDragEventArgs<T>;
    rowdragleave: RowDragEventArgs<T>;
    rowdragstart: RowDragEventArgs<T>;
    rowdragend: RowDragEventArgs<T>;
    rowdragover: RowDragEventArgs<T>;
    rowdrop: RowDragEventArgs<T>;
}

export interface VtableEventsOn<T> {
    onRowclick: RowClickEventArgs<T>;
    onRowdblclick: RowClickEventArgs<T>;
    onRowdragenter: RowDragEventArgs<T>;
    onRowdragleave: RowDragEventArgs<T>;
    onRowdragstart: RowDragEventArgs<T>;
    onRowdragend: RowDragEventArgs<T>;
    onRowdragover: RowDragEventArgs<T>;
    onRowdrop: RowDragEventArgs<T>;
}
