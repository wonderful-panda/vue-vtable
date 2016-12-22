export function positive(n: any) {
    return typeof n === "number" && n > 0;
};
export function notNegative(n: any) {
    return typeof n === "number" && n >= 0;
};
