import Vue, { VNode, VueConstructor } from "vue";
import * as tsx from "vue-tsx-support";
import * as tc from "vue-typed-component";
import { TreeNode, TreeNodeWithState, VtableEvents, VtableEventsOn, VtableSlotCellProps, VtreeProps } from "../types";
export interface VtreeTableData {
    expandMap: {
        [key: string]: boolean;
    };
}
export declare const ExpandableCell: VueConstructor<tsx.TsxComponentInstance<tsx.PropsForOutside<{
    nodeState: TreeNodeWithState<any>;
}, "nodeState">, {}, {}> & Vue & {
    nodeState: TreeNodeWithState<any>;
}>;
export declare class Vtreetable<T> extends tc.StatefulEvTypedComponent<VtreeProps<T>, VtableEvents<TreeNodeWithState<T>>, VtreeTableData, VtableEventsOn<TreeNodeWithState<T>>, {
    cell: VtableSlotCellProps<TreeNodeWithState<T>>;
}> {
    data(): VtreeTableData;
    readonly flattenVisibleItems: ReadonlyArray<TreeNodeWithState<T>>;
    readonly itemCount: number;
    addDescendentVisibleItems(parent: TreeNode<T>, level: number, arr: Array<TreeNodeWithState<T>>): void;
    sliceItems(start: number, end: number): ReadonlyArray<TreeNodeWithState<T>>;
    getItemKey_({data}: TreeNodeWithState<T>): string | number;
    toggleExpand(data: T): void;
    expandAll(): void;
    expandAllDescendants(from: TreeNode<T>): void;
    collapseAll(): void;
    render(): VNode;
}
