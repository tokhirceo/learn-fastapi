import { $ } from "../utils/dom.js";
import { state, emit } from "../state.js";
import { go, pathFor } from "../router.js";

export function initFilters() {
  document.querySelectorAll("[data-filter]").forEach((b) =>
    b.addEventListener("click", () => go(pathFor(b.dataset.filter))));
  $("#search").addEventListener("input", (e) => { state.q = e.target.value; emit(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; emit(); });
}

export function renderFilters() {
  document.querySelectorAll("[data-filter]").forEach((b) => {
    const on = b.dataset.filter === state.filter;
    const nav = b.classList.contains("nav-btn");
    b.setAttribute("aria-pressed", on);
    b.classList.toggle("bg-teal-50", on && nav);
    b.classList.toggle("text-teal-800", on && nav);
    b.classList.toggle("bg-teal-700", on && !nav);
    b.classList.toggle("text-white", on && !nav);
    b.classList.toggle("text-slate-600", !on);
    b.classList.toggle("hover:bg-slate-100", !on);
  });
}
