export function handleStoreTask(id, value) {
  window.localStorage.setItem(id, value);
}

export function handleDeleteStoreTask(id) {
  window.localStorage.removeItem(id);
}
