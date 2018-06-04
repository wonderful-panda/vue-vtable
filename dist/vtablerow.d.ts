import { VNode } from "vue";
import { CssProperties } from "vue-css-definition";
import * as tc from "vue-typed-component";
import * as t from "../types";
export interface VtableRowProps<T> {
    item: T;
    columns: ReadonlyArray<t.VtableColumn>;
    columnWidths: {
        [columnId: string]: number;
    };
    index: number;
    height: number;
}
export declare class VtableRow<T> extends tc.TypedComponent<VtableRowProps<T>, {
    splitter: {
        index: number;
    };
    cell: t.VtableSlotCellProps<T>;
}> {
    readonly rowStyle: CssProperties;
    private cellStyle(width);
    private readonly cells;
    render(): VNode;
}
