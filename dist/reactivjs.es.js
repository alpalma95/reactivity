const E = (t, e) => (Array.isArray(t) && (e = t, t = {}), [t, e]), S = (t, e) => {
  const n = document.createTreeWalker(
    t,
    NodeFilter.SHOW_ELEMENT,
    function(c) {
      var o;
      return c.getAttribute("ref") == e || c.getAttributeNames().some((i) => i.includes(":")) && e === "createScope" ? NodeFilter.FILTER_ACCEPT : (o = c.getAttribute("ref")) != null && o.toUpperCase().includes("CONTROLLER") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
    }
  ), r = [];
  let s;
  for (; s = n.nextNode(); )
    r.push(s);
  return r;
}, f = (t, e) => typeof t == "function" ? t(e) : t.val ?? t;
let h = null, y = /* @__PURE__ */ new WeakMap();
class R {
  constructor(e) {
    this.cb = e, this._set = /* @__PURE__ */ new Set();
  }
  unhook() {
    this._set.forEach((e) => e.delete(this));
  }
}
let l = (t) => {
  h = new R(t), h.cb();
  let e = h;
  return h = null, e;
}, W = (t, e) => {
  if (h === null)
    return;
  let n = ((r, s, c) => {
    let o;
    return r.has(s) && r.get(s).has(c) ? o = r.get(s).get(c) : r.has(s) && !r.get(s).has(c) ? r.get(s).set(c, o = /* @__PURE__ */ new Set()) : r.set(s, /* @__PURE__ */ new Map([[c, o = /* @__PURE__ */ new Set()]])), o;
  })(y, t, e);
  h._set.add(n), n.add(h);
}, w = (t) => {
  let e = ((n) => {
    if (Array.isArray(n) || typeof n != "function" && typeof n != "object")
      return { val: n };
    if (typeof n == "function") {
      let r = w(1);
      return l(() => r.val = n()), r;
    }
    return Object.fromEntries(Object.entries(n).map(([r, s]) => [r, typeof s == "object" || typeof s == "function" ? w(s) : s]));
  })(t);
  return new Proxy(e, { get: (n, r, s) => (W(n, r), Reflect.get(n, r, s)), set: (n, r, s, c) => (n[r] !== s && (Reflect.set(n, r, s, c), ((o, i) => {
    y.get(o) && y.get(o).get(i).forEach(({ cb: u }) => u());
  })(n, r)), !0) });
};
const F = {
  selector: "rv-class",
  construct: function({ element: t }, e) {
    return Object.entries(e).reduce((r, [s, c]) => {
      let o = l(() => {
        !t.classList.contains(s) && f(c, t) && t.classList.add(s), t.classList.contains(s) && !f(c, t) && t.classList.remove(s);
      });
      return r.push(o), r;
    }, []);
  }
}, p = /* @__PURE__ */ new WeakMap(), A = (t, e) => {
  let { isArray: n } = Array, r = p.get(t);
  r ? p.set(
    t,
    n(e) ? [...r, ...e] : [...r, e]
  ) : p.set(t, [e]);
}, L = (t) => {
  var e;
  typeof (t == null ? void 0 : t.destroy) == "function" && t.destroy(t), (e = p.get(t)) == null || e.forEach((n) => {
    n.unhook();
  }), p.delete(t), t == null || t.remove();
}, _ = (t, e, n) => {
  let r = l(
    () => t.setAttribute(e, f(n, t))
  );
  A(t, r);
};
class P extends Array {
  mount(e) {
    return this.forEach((n) => e(n)), this;
  }
}
const j = (t, e) => {
  var n;
  return (n = t.getAttributeNames()) == null ? void 0 : n.reduce((r, s) => (s.startsWith(":") && s !== ":" && (r[s.replaceAll(":", "")] = e[t.getAttribute(s)] ?? t.getAttribute(s)) && t.removeAttribute(s), s === ":" && (r[t.tagName.toLowerCase()] = e[t.getAttribute(s)]) && t.removeAttribute(s), r), {});
}, g = (t, e = []) => {
  t.$ = x(t), t.mount = function(n) {
    n(t);
  }, t.setProps = function(n) {
    v({ element: t, ctx: n }), e.length && m(t, e);
  };
}, x = (t = document) => new Proxy(
  {},
  {
    get: (e, n) => function(r, s = []) {
      let [c, o] = E(r, s);
      const i = [...S(t, n)];
      let u = n === "createScope" ? c : null;
      return u && i.push(t), i.forEach((a, d) => {
        u && (c = j(a, u)), v({ element: a, ctx: c }), m(a, o), g(a, c);
      }), i.length === 1 ? i[0] : new P(...i);
    }
  }
), K = x(), q = (t, e, n) => {
  const r = e.children, { trackBy: s } = e.dataset;
  t.length < r.length && [...r].filter(
    (o) => !t.some((i) => o.dataset.key == i[s])
  ).forEach((o) => {
    L(
      e.querySelector(`[data-key="${o.dataset.key}"]`)
    );
  }), t.forEach((c, o) => {
    r[o] || e.appendChild(n(c));
    const i = c[s] == r[o].dataset.key, u = t.length === r.length, a = `[data-key="${c[s]}"]`;
    if (!i && u) {
      const d = e.querySelector(a) ?? n(c);
      e.replaceChild(d, r[o]);
    }
    if (!i && !u) {
      const d = e.querySelector(a) ?? n(c);
      e.insertBefore(d, r[o]);
    }
  });
}, N = (t, e) => {
  var r;
  const n = ((r = t.children[0]) == null ? void 0 : r.cloneNode(!0)) ?? t.querySelector("template").content.children[0];
  return g(n), (s) => (e(s)(n), n);
}, D = {
  selector: "rv-for",
  construct: function({ element: t }, e) {
    var o;
    let [n, r, s] = e, c;
    if ((o = t.dataset) != null && o.populate) {
      const i = JSON.parse(t.dataset.populate);
      n.val = s ? i.map(s) : i, t.removeAttribute("data-populate"), c = N(t, r);
    }
    return c && n.val.forEach((i, u) => {
      const a = t.children[u];
      g(a), r(i)(a);
    }), l(() => {
      q(n.val, t, c ?? r);
    });
  }
}, T = {
  selector: "rv-if",
  construct: function(t, e) {
    let n = new Comment("rv-if");
    return l(() => {
      !f(e, t.element) && !t.element.isConnected && (t.replaceWith = n), n.isConnected && f(e, t.element) && (n.replaceWith(t.element), typeof t.element.init == "function" && t.element.init(t.element)), t.element.isConnected && !f(e, t.element) && (typeof t.element.destroy == "function" && t.element.destroy(t.element), t.element.replaceWith(n));
    });
  }
}, I = {
  selector: "rv-model",
  construct: function({ element: t }, e) {
    return t.addEventListener("input", () => {
      e.val = t.value;
    }), l(() => {
      t.value = e.val;
    });
  }
}, $ = {
  selector: "rv-show",
  construct: function({ element: t }, e) {
    return l(() => t.style.display = f(e, t) ? null : "none");
  }
}, B = {
  selector: "rv-text",
  construct: function(t, e) {
    let n = null;
    return t.element.tagName.toLowerCase() === this.selector && (n = new Text(), t.element.replaceWith(n)), l(() => {
      t.element.textContent === f(e, t.element) || (n == null ? void 0 : n.textContent) === f(e, t.element) || t.element instanceof Comment || (n ? n.textContent = f(e, n) : t.element.textContent = f(
        e,
        t.element
      ));
    });
  }
}, O = [
  D,
  B,
  F,
  $,
  T,
  I
], C = Object.fromEntries(
  O.map((t) => [t.selector, t])
), U = (...t) => {
  t.forEach(
    (e) => C[e.selector] = e
  );
}, v = (t) => {
  for (const e in t.ctx) {
    let n = C[e];
    const r = e.startsWith("on") && typeof t.ctx[e] == "function";
    if (e === "init" || e === "destroy") {
      e === "init" && t.ctx[e](t.element), t.element[e] = t.ctx[e];
      continue;
    }
    if (n) {
      let s = n.construct(t, t.ctx[e]);
      s && A(t.element, s);
      continue;
    }
    if (r) {
      t.element.addEventListener(e.slice(2), t.ctx[e]);
      continue;
    }
    if (typeof t.ctx[e] == "function" || typeof t.ctx[e] == "object") {
      _(t.element, e, t.ctx[e]);
      continue;
    }
    t.element.setAttribute(e, t.ctx[e]);
  }
}, m = (t, e) => {
  e.length && e.forEach((n) => {
    let r = n instanceof HTMLElement || n instanceof Comment || n instanceof DocumentFragment ? n : new Text(n);
    t.appendChild(r);
  });
}, J = (t) => function(e, n = []) {
  let [r, s] = E(e, n), c = {
    element: t === "fragment" ? new DocumentFragment() : document.createElement(t),
    ctx: r
  };
  return v(c), m(c.element, s), c.replaceWith ?? c.element;
}, z = new Proxy(
  {},
  {
    get: function(t, e) {
      return e in t || Reflect.set(t, e, J(e)), t[e];
    }
  }
);
export {
  K as $,
  z as h,
  l as hook,
  U as registerDirectives,
  L as safeRemove,
  w as stream
};
