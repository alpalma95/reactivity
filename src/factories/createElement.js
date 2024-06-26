import { switchProps } from "../utils.js";
import { appendChildren, hydrate } from "./shared.js";

export const html = (tagName) => {
    return function (props_raw, children_raw = []) {
        let [props, children] = switchProps(props_raw, children_raw);

        let block = {
            element:
                tagName === "fragment"
                    ? new DocumentFragment()
                    : document.createElement(tagName),
            ctx: props,
        };

        hydrate(block);
        appendChildren(block.element, children);

        block.element.init &&
            typeof block.element.init === "function" &&
            block.element.init();

        return block.replaceWith ?? block.element;
    };
};
let txt = (str, ...args) =>
    str.reduce((acc, cur, i) => [...acc, ...[cur, args[i] ?? ""]], []);
export const h = new Proxy(
    {},
    {
        get: function (target, value) {
            if (!(value in target))
                Reflect.set(target, value, value === "txt" ? txt : html(value));

            return target[value];
        },
    }
);
