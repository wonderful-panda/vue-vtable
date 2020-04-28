import Vue, { VNode } from "vue";
import * as tsx from "vue-tsx-support";
import * as t from "../types";
import { DeclareAutoProps } from "./tsx-util";
export declare class VtableRow<T> extends Vue {
    item: T;
    columns: ReadonlyArray<t.VtableColumn>;
    columnWidths: Record<string, number>;
    index: number;
    height: number;
    _tsx: DeclareAutoProps<VtableRow<T>>;
    $scopedSlots: tsx.InnerScopedSlots<{
        splitter: {
            index: number;
        };
        cell: t.VtableSlotCellProps<T>;
    }>;
    private readonly rowStyle;
    private cellStyle;
    private readonly cells;
    render(): VNode;
}
