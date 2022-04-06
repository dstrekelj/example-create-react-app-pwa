import Dexie from "dexie";
import cuid from "cuid";

const db = new Dexie("app");

db.version(1).stores({
  notes: "id",
});

export async function getAll() {
  return await db.notes.toArray();
}

export async function getOne(id) {
  return await db.notes.get(id);
}

export async function add(data) {
  const id = data.id || cuid();
  /**
   * @note returns primary key, so we need to get one.
   */
  await db.notes.add({ ...data, id });
  return await getOne(id);
}

export async function put(id, data) {
  /**
   * @note returns primary key, so we need to get one.
   */
  await db.notes.put({ ...data, id });
  return await getOne(id);
}

export async function remove(id) {
  return await db.notes.delete(id);
}
