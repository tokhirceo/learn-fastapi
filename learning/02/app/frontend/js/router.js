// Hash asosidagi oddiy router:
//   #/          -> barcha vazifalar
//   #/pending   -> bajarilmaganlar
//   #/done      -> bajarilganlar
//   #/task/{id} -> vazifa tafsilotlari oynasi
export const pathFor = (filter) => (filter === "all" ? "#/" : "#/" + filter);
export const taskPath = (id) => "#/task/" + id;

export function currentRoute() {
  const h = location.hash.replace(/^#\/?/, "");
  const m = h.match(/^task\/(\d+)$/);
  if (m) return { name: "task", id: Number(m[1]) };
  if (h === "pending" || h === "done") return { name: "filter", filter: h };
  return { name: "filter", filter: "all" };
}

export function go(hash) {
  if (location.hash !== hash) location.hash = hash;
}

export function startRouter(onChange) {
  window.addEventListener("hashchange", onChange);
}
