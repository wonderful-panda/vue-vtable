import Vue, { VNode } from "vue";
import * as tsx from "vue-tsx-support";
import * as t from "../types";
import { DeclareAutoProps } from "./tsx-util";
export declare class Vlist<T> extends Vue {
    $refs: {
        scrollable: Element;
        content: Element;
    };
    $scopedSlots: tsx.InnerScopedSlots<{
        row: t.VlistSlotRowProps<T>;
    }>;
    _tsx: DeclareAutoProps<Vlist<T>, Vue, "ensureVisible"> & tsx.DeclareOn<t.VlistEvents<T>> & tsx.DeclareOnEvents<t.VlistEventsOn<T>>;
    $options: Vue["$options"] & {
        ticking?: boolean;
    };
    getItemKey: t.GetKeyFunction<T>;
    contentWidth: number;
    rowStyleCycle?: number;
    rowHeight: number;
    itemCount: number;
    sliceItems: t.SliceFunction<T>;
    overscan?: number;
    private scrollLeft;
    private scrollTop;
    private scrollDirection;
    private bodyWidth;
    private bodyHeight;
    private vScrollBarWidth;
    private hScrollBarHeight;
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
    private updateBodySize;
    private nativeOnScroll;
    private emitScrollEvent;
    private payload;
    private contentHeightChanged;
    private contentWidthChanged;
    private readonly rows;
    render(): VNode;
}
