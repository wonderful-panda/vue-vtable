declare namespace vlistVue {
    const vlist: any;
    const vtable: any;
    interface VtableColumn {
        title: string;
        defaultWidth: number;
        minWidth?: number;
        className?: string;
        value?: (item: any, index: number, ctx: any) => string;
        component?: any;
    }
}

export = vlistVue;
