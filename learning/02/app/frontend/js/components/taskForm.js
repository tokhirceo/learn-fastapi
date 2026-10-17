import { $, el, backdropClose } from "../utils/dom.js";
import { createTask, patchTask } from "../actions.js";
import { toast } from "../utils/toast.js";

let editing = null;
const dlg = () => $("#taskDlg");

function setSaving(on) {
  const b = $("#saveBtn"); b.disabled = on; b.replaceChildren();
  if (on) b.append(el("span", "h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"), document.createTextNode("Saqlanmoqda…"));
  else b.textContent = editing ? "O‘zgarishlarni saqlash" : "Vazifa yaratish";
}
function showErr(msg) { const p = $("#formErr"); p.textContent = msg || ""; p.classList.toggle("hidden", !msg); }

export function openTaskForm(task) {
  editing = task || null;
  $("#dlgTitle").textContent = task ? "Vazifani tahrirlash" : "Yangi vazifa";
  $("#fTitle").value = task ? task.title : "";
  $("#fDesc").value = task && task.description ? task.description : "";
  $("#fDone").checked = task ? !!task.is_completed : false;
  $("#fDoneRow").classList.toggle("hidden", !task);
  $("#fDoneRow").classList.toggle("flex", !!task);
  showErr(""); setSaving(false);
  dlg().showModal(); $("#fTitle").focus();
}

export function initTaskForm() {
  backdropClose(dlg());
  $("#newBtn").addEventListener("click", () => openTaskForm());
  $("#cancelBtn").addEventListener("click", () => dlg().close());
  $("#taskForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = $("#fTitle").value.trim(), description = $("#fDesc").value.trim();
    if (!title) { showErr("Vazifa nomini kiriting."); $("#fTitle").focus(); return; }
    if (title.length > 200) { showErr("Vazifa nomi 200 belgidan oshmasligi kerak."); return; }
    showErr("");
    try {
      if (editing) {
        const patch = {};
        if (title !== editing.title) patch.title = title;
        if (description !== (editing.description || "")) patch.description = description;
        if ($("#fDone").checked !== !!editing.is_completed) patch.is_completed = $("#fDone").checked;
        if (Object.keys(patch).length === 0) { dlg().close(); return; }
        setSaving(true);
        await patchTask(editing.id, patch);
        toast("Vazifa yangilandi");
      } else {
        setSaving(true);
        const body = { title }; if (description) body.description = description;
        await createTask(body);
        toast("Vazifa yaratildi");
      }
      dlg().close(); $("#taskForm").reset();
    } catch (err) { showErr(err.message); setSaving(false); }
  });
}
