import { predicate } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function defaultifempty<T>(source: Iterable<T>, defaultValue?: T) {
    return wrapInIterable(function* () {
        var hasValue = false;
        for (var item of source) {
            hasValue = true;
            yield item;
        }
        if (!hasValue) {
            yield defaultValue;
        }
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        defaultifempty(defaultValue?: T): Enumerable<T>;
    }
}
Enumerable.prototype.defaultifempty = function <T>(this: Enumerable<T>, defaultValue?: T): Enumerable<T> {
    return new Enumerable<T>(defaultifempty<T>(this, defaultValue));
};