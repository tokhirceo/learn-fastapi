import { $, backdropClose } from "../utils/dom.js";
import { removeTask } from "../actions.js";
import { toast } from "../utils/toast.js";

let target = null;
const dlg = () => $("#delDlg");

export function openDelete(task) {
  target = task;
  $("#delText").textContent = "“" + task.title + "” butunlay o‘chiriladi. Bu amalni qaytarib bo‘lmaydi.";
  $("#delErr").classList.add("hidden");
  $("#delOk").disabled = false; $("#delOk").textContent = "O‘chirish";
  dlg().showModal(); $("#delCancel").focus();
}

export function initDeleteDialog() {
  backdropClose(dlg());
  $("#delCancel").addEventListener("click", () => dlg().close());
  $("#delOk").addEventListener("click", async () => {
    if (!target) return;
    const btn = $("#delOk"); btn.disabled = true; btn.textContent = "O‘chirilmoqda…";
    try {
      await removeTask(target.id);
      dlg().close(); toast("Vazifa o‘chirildi");
    } catch (e) {
      const p = $("#delErr"); p.textContent = e.message; p.classList.remove("hidden");
      btn.disabled = false; btn.textContent = "O‘chirish";
    }
  });
}
