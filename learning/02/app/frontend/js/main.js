import { state, subscribe, emit, findTask } from "./state.js";
import { loadTasks } from "./actions.js";
import { currentRoute, go, pathFor, startRouter } from "./router.js";
import { toast } from "./utils/toast.js";
import { renderStats } from "./components/stats.js";
import { initFilters, renderFilters } from "./components/filters.js";
import { renderList } from "./components/taskList.js";
import { initTaskForm } from "./components/taskForm.js";
import { initDeleteDialog } from "./components/confirmDialog.js";
import { initTaskDetail, openTaskDetail, closeTaskDetail, renderTaskDetail } from "./components/taskDetail.js";

function render() {
  renderStats(); renderFilters(); renderList(); renderTaskDetail();
}

function applyRoute() {
  const r = currentRoute();
  if (r.name === "filter") { state.filter = r.filter; closeTaskDetail(); emit(); return; }
  if (state.loading) return; // yuklangandan keyin qayta chaqiriladi
  const task = findTask(r.id);
  if (!task) { toast("Vazifa topilmadi."); go(pathFor(state.filter)); return; }
  openTaskDetail(task);
}

subscribe(render);
initFilters(); initTaskForm(); initDeleteDialog(); initTaskDetail();
startRouter(applyRoute);
applyRoute();
loadTasks().then(applyRoute);
