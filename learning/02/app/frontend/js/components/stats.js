import { $ } from "../utils/dom.js";
import { state, getStats } from "../state.js";

export function renderStats() {
  const { total, done, pending, pct } = getStats();
  const ready = !state.loading && !state.error;
  $("#stTotal").textContent = ready ? total : "–";
  $("#stDone").textContent = ready ? done : "–";
  $("#stPending").textContent = ready ? pending : "–";
  $("#stPercent").textContent = ready ? pct + "%" : "–";
  $("#barFill").style.width = (ready ? pct : 0) + "%";
  $("#bar").setAttribute("aria-valuenow", ready ? pct : 0);
  document.querySelectorAll("[data-count]").forEach((n) => {
    const k = n.dataset.count;
    n.textContent = !ready ? "" : k === "all" ? total : k === "done" ? done : pending;
  });
}
