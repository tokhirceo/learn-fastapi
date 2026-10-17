import { $ } from "./dom.js";

let timer;
export function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("opacity-0", "translate-y-4");
  clearTimeout(timer);
  timer = setTimeout(() => t.classList.add("opacity-0", "translate-y-4"), 3200);
}
