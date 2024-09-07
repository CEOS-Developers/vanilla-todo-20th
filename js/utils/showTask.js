import { handleNewTask } from "./handleNewTasks.js";

export function showTask() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      if (value) {
        handleNewTask(key, value);
      }
    }
  }
}
