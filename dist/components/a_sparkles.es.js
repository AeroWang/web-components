var u = Object.defineProperty;
var f = (i, s, e) => s in i ? u(i, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[s] = e;
var n = (i, s, e) => (f(i, typeof s != "symbol" ? s + "" : s, e), e);
const a = (i, s) => Math.floor(Math.random() * (s - i)) + i;
function _(i, s = void 0, e = 1) {
  const t = [];
  typeof s > "u" && (s = i, i = 0);
  for (let r = i; r < s; r += e)
    t.push(r);
  return t;
}
function g() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
const y = (i) => window.matchMedia(i).matches, m = (i, s = { timeId: null }, e, t) => {
  if (typeof e == "number" && typeof t == "number") {
    const r = () => {
      const l = a(e, t);
      s.timeId = window.setTimeout(() => {
        i(), r();
      }, l);
    };
    r();
  } else
    window.clearTimeout(s.timeId);
}, b = ".sparkles-box{position:relative;display:inline-block;box-sizing:border-box;cursor:pointer}.single-sparkle-box{position:absolute;transform:translate3d(-50%,-50%,0);color:orange;pointer-events:none}.slot{position:relative;z-index:5}@media (prefers-reduced-motion: no-preference){.single-sparkle-box{animation:comeInout .6s ease-in-out forwards}.single-sparkle-box svg{animation:spin .6s ease-in-out forwards}}@keyframes comeInout{0%{transform:scale(0)}50%{transform:scale(1)}to{transform:scale(0)}}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(180deg)}}", c = (i = !1, s = [], e = "text", t, r) => ({
  id: String(a(1e4, 99999)),
  createdAt: Date.now(),
  size: a(10, 17),
  style: {
    color: s.length ? s[a(0, s.length)] : void 0,
    top: `${a(r[0], r[1])}%`,
    left: `${a(t[0], t[1])}%`,
    zIndex: (e === "text" ? i ? 1 : a(1, 8) : 6).toString()
  }
}), p = "(prefers-reduced-motion: no-preference)";
class w extends HTMLElement {
  constructor() {
    super();
    n(this, "_mediaQueryList", window.matchMedia(p));
    n(this, "_preferredReducedMotion", !y(p));
    n(this, "_sparklesBox");
    n(this, "_sparkles", []);
    n(this, "_timeId", { timeId: null });
    n(this, "_shadow");
    // 可传入属性 colors，min-delay，max-delay，left-offset-range,top-offset-range
    n(this, "_randomColors");
    n(this, "_minDelay", 300);
    n(this, "_maxDelay", 800);
    n(this, "_leftOffsetRange", [-15, 60]);
    n(this, "_topOffsetRange", [0, 85]);
    n(this, "_slotType", "text");
    this._shadow = this.attachShadow({ mode: "closed" });
    const e = document.createElement("style");
    e.textContent = b, this._shadow.appendChild(e), this._sparklesBox = document.createElement("div"), this._sparklesBox.className = "sparkles-box";
    const t = document.createElement("slot");
    t.setAttribute("class", "slot"), this._sparklesBox.appendChild(t), this._shadow.appendChild(this._sparklesBox), this._randomColors = this.getAttribute("colors") ? this.getAttribute("colors").split(",").map((o) => o.trim()) : void 0;
    const r = this.getAttribute("left-offset-range") ? this.getAttribute("left-offset-range").split(",").map((o) => Number(o.trim())) : [-15, 60];
    this._leftOffsetRange = r.length === 2 ? r : [-10, 60];
    const l = this.getAttribute("top-offset-range") ? this.getAttribute("top-offset-range").split(",").map((o) => Number(o.trim())) : [-15, 60];
    if (this._topOffsetRange = l.length === 2 ? l : [0, 85], this._minDelay = this.getAttribute("min-delay") ? Number(this.getAttribute("min-delay")) : 300, this._maxDelay = this.getAttribute("max-delay") ? Number(this.getAttribute("max-delay")) < 500 ? 500 : Number(this.getAttribute("max-delay")) : 800, this._slotType = this.getAttribute("slot-type") ? this.getAttribute("slot-type") : "text", this._preferredReducedMotion) {
      const o = this.getAttribute("init-num"), d = document.createDocumentFragment();
      this._sparkles = _(a(0, Number(o))).map(() => c(this._preferredReducedMotion, this._randomColors)), this._sparkles.forEach((h) => {
        this.generateSparkle(h), d.appendChild(this.generateSparkle(h));
      }), this._sparklesBox.appendChild(d);
    }
    this.reCreate = this.reCreate.bind(this), this.mediaListener = this.mediaListener.bind(this);
  }
  generateSparkle(e) {
    const t = document.createElement("span");
    return t.className = "single-sparkle-box", t.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${e.size}" height="${e.size}" viewBox="0 0 160 160" fill="none"><path fill="currentColor" d="M80 0s4.285 41.292 21.496 58.504C118.707 75.715 160 80 160 80s-41.293 4.285-58.504 21.496S80 160 80 160s-4.285-41.293-21.496-58.504C41.292 84.285 0 80 0 80s41.292-4.285 58.504-21.496C75.715 41.292 80 0 80 0z"></path></svg>`, t.style.color = e.style.color, t.style.top = e.style.top, t.style.left = e.style.left, t.style.zIndex = e.style.zIndex, t.id = e.id, t;
  }
  mediaListener(e) {
    if (e && (this._preferredReducedMotion = !e.matches, this._preferredReducedMotion))
      return m(this.reCreate, this._timeId, null, null);
    this._preferredReducedMotion || m(this.reCreate, this._timeId, this._minDelay, this._maxDelay);
  }
  // insert
  reCreate() {
    const e = c(!1, this._randomColors, this._slotType, this._leftOffsetRange, this._topOffsetRange), t = Date.now(), r = this._sparkles.filter((l) => {
      if (t - l.createdAt < this._maxDelay + 150)
        return !0;
      {
        const d = this._shadow.getElementById(l.id);
        return d && this._sparklesBox.removeChild(d), !1;
      }
    });
    this._sparklesBox.appendChild(this.generateSparkle(e)), r.push(e), this._sparkles = [...r];
  }
  connectedCallback() {
    this.mediaListener(), this._mediaQueryList.addEventListener ? this._mediaQueryList.addEventListener("change", this.mediaListener) : this._mediaQueryList.addListener(this.mediaListener);
  }
  /*// TODO: 属性被修改
  attributeChangedCallback(attribute, oldValue, newValue) {
  	console.log(attribute);
  	if (typeof this._timeId === 'number') return window.clearTimeout(this._timeId);
  	if (attribute === 'colors') {
  		this._randomColors = this.getAttribute('colors') ? this.getAttribute('colors').split(',').map((item) => item.trim()) : undefined;
  		this._timeId = randomIntervalTick(this.reCreate, 150, 600);
  	}
  }*/
  disconnectCallback() {
    if (this._mediaQueryList.removeEventListener ? this._mediaQueryList.removeEventListener("change", this.mediaListener) : this._mediaQueryList.removeListener(this.mediaListener), typeof this._timeId == "number")
      return window.clearTimeout(this._timeId);
  }
}
if (g())
  customElements.define("a-sparkles", w);
else
  throw new Error("仅在浏览器中可用");
