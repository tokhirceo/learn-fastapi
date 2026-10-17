import { $, backdropClose } from "../utils/dom.js";
import { state, findTask } from "../state.js";
import { toggleTask } from "../actions.js";
import { currentRoute, go, pathFor } from "../router.js";
import { openTaskForm } from "./taskForm.js";
import { openDelete } from "./confirmDialog.js";

let currentId = null;
const dlg = () => $("#detailDlg");

export function openTaskDetail(task) {
  currentId = task.id;
  if (!dlg().open) dlg().showModal();
  renderTaskDetail();
}

export function closeTaskDetail() { if (dlg().open) dlg().close(); }

// Vazifa o‘zgarganda (holat, tahrir, o‘chirish) oyna ham yangilanadi
export function renderTaskDetail() {
  const d = dlg(); if (!d.open) return;
  const t = findTask(currentId);
  if (!t) { d.close(); return; }
  $("#dTitle").textContent = t.title;
  const s = $("#dStatus");
  s.textContent = t.is_completed ? "Bajarilgan" : "Bajarilmagan";
  s.className = "mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold " + (t.is_completed ? "bg-teal-50 text-teal-800" : "bg-amber-50 text-amber-800");
  const has = t.description && String(t.description).trim();
  const p = $("#dDesc");
  p.textContent = has ? t.description : "Tavsif kiritilmagan.";
  p.className = "wrap mt-4 whitespace-pre-line text-sm " + (has ? "text-slate-600" : "italic text-slate-400");
  $("#dId").textContent = "#" + t.id;
  const tg = $("#dToggle");
  tg.disabled = state.busy.has(t.id);
  tg.textContent = t.is_completed ? "Bajarilmagan deb belgilash" : "Bajarilgan deb belgilash";
}

export function initTaskDetail() {
  const d = dlg();
  backdropClose(d);
  // Oyna yopilganda (Escape, ×, orqa fon) manzil ro‘yxatga qaytadi
  d.addEventListener("close", () => { if (currentRoute().name === "task") go(pathFor(state.filter)); });
  $("#dClose").addEventListener("click", () => d.close());
  $("#dToggle").addEventListener("click", () => { const t = findTask(currentId); if (t) toggleTask(t.id, !t.is_completed); });
  $("#dEdit").addEventListener("click", () => { const t = findTask(currentId); if (t) { d.close(); openTaskForm(t); } });
  $("#dDelete").addEventListener("click", () => { const t = findTask(currentId); if (t) { d.close(); openDelete(t); } });
}
