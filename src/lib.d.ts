declare function require(id: string): any;

declare interface StyleObject {
    bottom?: string;
    boxSizing?: "border-box" | "content-box";
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
    maxWidth?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    overflow?: "auto" | "scroll" | "hidden" | "visible";
    padding?: number | string;
    position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
    right?: string;
    textWrap?: "normal" | "none" | "unrestricted" | "suppress",
    top?: string;
    width?: string;
}

declare interface VtableColumn {
    title: string;
    defaultWidth: number;
    minWidth?: number;
    className?: string;
    value?: (item: any, index: number, ctx: any) => string;
    component?: any;
}

declare interface VtableListCtx {
    ctx: any;
    columns: VtableColumn[],
    getRowClass: (item: any, index: number) => string;
    widths: number[];
    splitterWidth: number;
}
