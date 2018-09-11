import { RowEventArgs, RowClickEventArgs, RowDragEventArgs, ScrollEventArgs } from "../types";

export default function events<T>() {
    return {
        onRowclick(_: RowClickEventArgs<T>) {},
        onRowdblclick(_: RowClickEventArgs<T>) {},
        onRowcontextmenu(_: RowClickEventArgs<T>) {},
        onRowdragenter(_: RowDragEventArgs<T>) {},
        onRowdragleave(_: RowDragEventArgs<T>) {},
        onRowdragstart(_: RowDragEventArgs<T>) {},
        onRowdragend(_: RowDragEventArgs<T>) {},
        onRowdragover(_: RowDragEventArgs<T>) {},
        onRowdrop(_: RowDragEventArgs<T>) {},
        onScroll(_: ScrollEventArgs) {}
    };
}
