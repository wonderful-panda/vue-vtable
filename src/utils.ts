export function px(value: number | string): string {
    if (typeof value === "string") {
        return value;
    }
    else {
        return px(value);
    }
}
