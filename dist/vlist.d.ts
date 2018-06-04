import { VNode } from "vue";
import * as tc from "vue-typed-component";
import * as t from "../types";
export interface VlistData {
    scrollLeft: number;
    scrollTop: number;
    bodyWidth: number;
    bodyHeight: number;
    vScrollBarWidth: number;
    hScrollBarHeight: number;
}
export declare class Vlist<T> extends tc.StatefulEvTypedComponent<t.VlistProps<T>, t.VlistEvents<T>, VlistData, t.VlistEventsOn<T>, {
    row: t.VlistSlotRowProps<T>;
}> {
    $refs: {
        scrollable: Element;
        content: Element;
    };
    data(): VlistData;
    private readonly containerStyle;
    private readonly headerStyle;
    private readonly scrollableStyle;
    private readonly contentStyle;
    private readonly spacerStyle;
    private readonly rowStyle;
    private readonly firstIndex;
    private readonly lastIndex;
    private readonly renderedItems;
    private readonly contentHeight;
    activated(): void;
    ensureVisible(index: number): void;
    updateBodySize(): void;
    onScroll(event: Event): void;
    onRowEvent(eventName: string, item: T, physicalIndex: number, event: Event): void;
    onContentHeightChanged(newValue: number, _oldValue: number): void;
    onContentWidthChanged(newValue: number, _oldValue: number): void;
    private readonly rows;
    render(): VNode;
}
