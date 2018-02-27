import * as Vue from "vue"
import { CssProperties } from "vue-css-definition";

export interface VtableColumn {
    title: string;
    defaultWidth: number;
    minWidth?: number;
    className?: string;
}

export interface VtableProps<T> {
    rowHeight: number;
    headerHeight?: number;
    columns: ReadonlyArray<VtableColumn>,
    items: ReadonlyArray<T>,
    rowStyleCycle?: number;
    splitterWidth?: number;
    rowClass?: string;
    getRowClass?: (item: T, index: number) => string | undefined;
    initialWidths?: ReadonlyArray<number>;
    getItemKey: (item: T) => number | string;
}

export interface VlistProps<T> {
    items: ReadonlyArray<T>,
    getItemKey: (item: T) => number | string;
    contentWidth?: number | string;
    rowHeight: number;
    rowStyleCycle?: number;
}

export interface VlistSlotRowProps<T> {
    item: T;
    index: number;
}

export interface VtableSlotCellProps<T> {
    item: T;
    index: number;
    columnId: string;
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

export interface ColumnResizeEventArgs {
    widths: ReadonlyArray<number>;
    event?: Event;
}

export interface VlistEvents<T> {
    rowclick: RowClickEventArgs<T>;
    rowdblclick: RowClickEventArgs<T>;
    rowcontextmenu: RowClickEventArgs<T>;
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
    onRowcontextmenu: RowClickEventArgs<T>;
    onRowdragenter: RowDragEventArgs<T>;
    onRowdragleave: RowDragEventArgs<T>;
    onRowdragstart: RowDragEventArgs<T>;
    onRowdragend: RowDragEventArgs<T>;
    onRowdragover: RowDragEventArgs<T>;
    onRowdrop: RowDragEventArgs<T>;
    onScroll: ScrollEventArgs;
}

export interface VtableEvents<T> extends VlistEvents<T> {
    columnresize: ColumnResizeEventArgs;
}


export interface VtableEventsOn<T> extends VlistEventsOn<T> {
    onColumnresize: ColumnResizeEventArgs;
}
