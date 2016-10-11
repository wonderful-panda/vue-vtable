export function positive(n) {
    return typeof n === "number" && n > 0;
};
export function notNegative(n) {
    return typeof n === "number" && n >= 0;
};
