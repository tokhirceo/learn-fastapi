import * as api from "./api/tasks.js";
import { state, emit } from "./state.js";
import { toast } from "./utils/toast.js";

const replace = (updated) => { state.tasks = state.tasks.map((t) => (t.id === updated.id ? updated : t)); };

export async function loadTasks() {
  state.loading = true; state.error = null; emit();
  try {
    const data = await api.listTasks();
    state.tasks = Array.isArray(data) ? data : [];
  } catch (e) { state.error = e.message; }
  state.loading = false; emit();
}

export async function toggleTask(id, value) {
  if (state.busy.has(id)) return;
  state.busy.add(id); emit();
  try { replace(await api.updateTask(id, { is_completed: value })); }
  catch (e) { toast(e.message); }
  state.busy.delete(id); emit();
}

// Quyidagilar xatoni chaqiruvchiga (forma/dialog) uzatadi
export async function createTask(body) {
  const t = await api.createTask(body);
  state.tasks.push(t); emit(); return t;
}
export async function patchTask(id, body) {
  const t = await api.updateTask(id, body);
  replace(t); emit(); return t;
}
export async function removeTask(id) {
  await api.deleteTask(id);
  state.tasks = state.tasks.filter((t) => t.id !== id); emit();
}
