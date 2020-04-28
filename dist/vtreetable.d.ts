import Vue, { VNode, VueConstructor } from "vue";
import * as tsx from "vue-tsx-support";
import { GetClassFunction, GetKeyFunction, TreeNode, TreeNodeWithState, VtableColumn, VtableEvents, VtableEventsOn, VtableSlotCellProps } from "../types";
import { DeclareAutoProps } from "./tsx-util";
export interface VtreeTableData {
    expandMap: {
        [key: string]: boolean;
    };
}
export declare const ExpandableCell: VueConstructor<tsx._TsxComponentInstanceV3<Vue & {
    nodeState: TreeNodeWithState<any>;
}, {}, {
    nodeState: TreeNodeWithState<any>;
} & {}, {}, {}, {}>>;
export declare class Vtreetable<T> extends Vue {
    $scopedSlots: tsx.InnerScopedSlots<{
        cell: VtableSlotCellProps<TreeNodeWithState<T>>;
    }>;
    rowHeight: number;
    headerHeight?: number;
    indentWidth: number;
    columns: ReadonlyArray<VtableColumn>;
    rootNodes: ReadonlyArray<TreeNode<T>>;
    rowStyleCycle?: number;
    splitterWidth?: number;
    rowClass?: string;
    getRowClass?: GetClassFunction<TreeNodeWithState<T>>;
    getItemKey: GetKeyFunction<T>;
    widths?: Record<string, number>;
    overscan?: number;
    _tsx: DeclareAutoProps<Vtreetable<T>, Vue, "toggleExpand" | "expandAll" | "collapseAll" | "expandAllDescendants"> & tsx.DeclareOn<VtableEvents<TreeNodeWithState<T>>> & tsx.DeclareOnEvents<VtableEventsOn<TreeNodeWithState<T>>>;
    private expandMap;
    private readonly flattenVisibleItems;
    private readonly itemCount;
    private addDescendentVisibleItems;
    private sliceItems;
    private getItemKey_;
    toggleExpand(data: T): void;
    expandAll(): void;
    expandAllDescendants(from: TreeNode<T>): void;
    collapseAll(): void;
    render(): VNode;
}
