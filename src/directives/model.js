import { hook } from "../streams.js";

export const modelDirective = {
  selector: "data-model",
  construct: function ({ element }, variable) {
    element.addEventListener('input', () => {
        variable.val = element.value
    })
    return hook(() => {
      element.value = variable.val;
    });
  },
};