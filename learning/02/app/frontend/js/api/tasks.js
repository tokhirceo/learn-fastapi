import { request } from "./client.js";
import { API_BASE } from "../config.js";

export const listTasks = () => request(API_BASE);
export const getTask = (id) => request(API_BASE + id);
export const createTask = (body) => request(API_BASE, { method: "POST", body: JSON.stringify(body) });
export const updateTask = (id, body) => request(API_BASE + id, { method: "PATCH", body: JSON.stringify(body) });
export const deleteTask = (id) => request(API_BASE + id, { method: "DELETE" });
