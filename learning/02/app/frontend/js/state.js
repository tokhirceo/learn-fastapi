export const state = { 
  tasks: [], 
  filter: "all", 
  sort: "id", 
  q: "", 
  busy: new Set(), 
  loading: true, 
  error: null
};

const subs = [];
export const subscribe = (fn) => subs.push(fn);
export const emit = () => subs.forEach((fn) => fn());
export const findTask = (id) => state.tasks.find((t) => t.id === id);

export function getStats() {
  const total = state.tasks.length;
  const done = state.tasks.filter((t) => t.is_completed).length;
  return { total, done, pending: total - done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function visibleTasks() {
  const q = state.q.trim().toLocaleLowerCase("uz");
  const has = (s) => (s || "").toLocaleLowerCase("uz").includes(q);
  const list = state.tasks.filter((t) => {
    if (state.filter === "done" && !t.is_completed) return false;
    if (state.filter === "pending" && t.is_completed) return false;
    return !q || has(t.title) || has(t.description);
  });
  const by = {
    id: (a, b) => a.id - b.id,
    alpha: (a, b) => (a.title || "").localeCompare(b.title || "", "uz", { sensitivity: "base" }),
    status: (a, b) => Number(a.is_completed) - Number(b.is_completed) || a.id - b.id,
  };
  return list.sort(by[state.sort]);
}
