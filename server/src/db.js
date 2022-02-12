const notes = new Map();

let total = 0;

function getAll() {
  return Array.from(notes.values());
}

function getOne(id) {
  return notes.get(id);
}

function add(data) {
  const id = String(++total);

  return notes.set(id, { ...data, id }).get(id);
}

function put(id, data) {
  return notes.set(id, { ...data, id }).get(id);
}

function remove(id) {
  return notes.delete(id);
}

module.exports = {
  getAll,
  getOne,
  add,
  put,
  remove,
};
