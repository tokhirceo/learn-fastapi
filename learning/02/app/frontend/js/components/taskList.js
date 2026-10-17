import { $, el, icon } from "../utils/dom.js";
import { state, visibleTasks } from "../state.js";
import { loadTasks, toggleTask } from "../actions.js";
import { go, taskPath } from "../router.js";
import { openTaskForm } from "./taskForm.js";
import { openDelete } from "./confirmDialog.js";

function emptyBlock(title, text, label, action) {
  const li = el("li", "rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center");
  li.append(el("p", "font-bold", title), el("p", "mx-auto mt-1 max-w-sm text-sm text-slate-500", text));
  if (label) {
    const b = el("button", "mt-4 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2", label);
    b.type = "button"; b.addEventListener("click", action); li.append(b);
  }
  return li;
}

function iconButton(label, path, hover, onClick, disabled) {
  const b = el("button", "grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:opacity-50 " + hover);
  b.type = "button"; b.title = label; b.disabled = disabled;
  b.setAttribute("aria-label", label);
  b.append(icon(path)); b.addEventListener("click", onClick);
  return b;
}

function taskItem(t) {
  const busy = state.busy.has(t.id);
  const li = el("li", "flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300");

  const cb = el("input", "mt-1 h-5 w-5 shrink-0 cursor-pointer rounded accent-teal-700 disabled:cursor-wait disabled:opacity-50");
  cb.type = "checkbox"; cb.checked = !!t.is_completed; cb.disabled = busy;
  cb.setAttribute("aria-label", "“" + t.title + "” vazifasini bajarilgan deb belgilash");
  cb.addEventListener("change", () => toggleTask(t.id, cb.checked));

  // Vazifa matni bosilsa — tafsilotlar oynasi ochiladi
  const body = el("button", "min-w-0 flex-1 cursor-pointer rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600");
  body.type = "button"; body.title = "Batafsil ko‘rish";
  body.addEventListener("click", () => go(taskPath(t.id)));
  body.append(el("span", "wrap block font-semibold leading-snug " + (t.is_completed ? "text-slate-400 line-through" : ""), t.title));
  if (t.description && String(t.description).trim())
    body.append(el("span", "wrap mt-1 line-clamp-2 block whitespace-pre-line text-sm text-slate-500", t.description));

  const actions = el("div", "flex shrink-0 gap-1");
  actions.append(
    iconButton("“" + t.title + "” vazifasini tahrirlash", "M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4", "hover:bg-slate-100 hover:text-slate-800", () => openTaskForm(t), busy),
    iconButton("“" + t.title + "” vazifasini o‘chirish", "M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3", "hover:bg-red-50 hover:text-red-600", () => openDelete(t), busy)
  );
  li.append(cb, body, actions);
  return li;
}

export function renderList() {
  const ul = $("#list"); ul.replaceChildren();
  if (state.loading) { for (let i = 0; i < 3; i++) ul.append(el("li", "skeleton h-[74px] rounded-2xl border border-slate-200 bg-white")); return; }
  if (state.error) { ul.append(emptyBlock("Ma’lumotlarni yuklab bo‘lmadi", state.error, "Qayta urinish", loadTasks)); return; }
  if (state.tasks.length === 0) { ul.append(emptyBlock("Hozircha vazifalar yo‘q", "Birinchi vazifangizni qo‘shing va ishni boshlang.", "Vazifa qo‘shish", () => openTaskForm())); return; }
  const list = visibleTasks();
  if (list.length === 0) { ul.append(emptyBlock("Hech narsa topilmadi", "Qidiruv so‘zi yoki filtrni o‘zgartirib ko‘ring.")); return; }
  list.forEach((t) => ul.append(taskItem(t)));
}
