export function px(value: number | string | undefined): string | undefined {
    if (typeof value === "string" || value === undefined) {
        return value;
    } else {
        return `${value}px`;
    }
}

export function supplier<T>(value: T): () => T {
    return () => value;
}

export function ensureNotUndefined<T>(value: T | undefined): T {
    if (value === undefined) {
        throw new Error("value is undefined");
    }
    return value;
}
