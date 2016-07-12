export interface VtableColumn {
    title: string;
    defaultWidth: number;
    minWidth?: number;
    value?: (item: any, index: number, ctx: any) => string;
    component?: any;
}

export const vlist: any;
export const vtable: any;