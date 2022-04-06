import Dexie from "dexie";
import cuid from "cuid";

const db = new Dexie("app");

db.version(2).stores({
  notes: "id",
  actions: "actionId, id, actionType",
});

export const ActionTypeEnum = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};

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

export async function addAction(actionType, id, data) {
  const actionId = cuid();
  const logItem = await db.actions.get({ id });

  if (logItem == null) {
    return await db.actions.add({ data, id, actionId, actionType });
  }

  if (
    logItem.actionType === ActionTypeEnum.CREATE &&
    actionType === ActionTypeEnum.UPDATE
  ) {
    await db.actions.put({ ...logItem, data });
    return await db.actions.get(id);
  }

  if (actionType === ActionTypeEnum.DELETE) {
    if (logItem.actionType === ActionTypeEnum.CREATE) {
      return await db.actions.delete(logItem.actionId);
    } else if (logItem.actionType === ActionTypeEnum.UPDATE) {
      await db.actions.put({ ...logItem, data, actionType: ActionTypeEnum.DELETE });
      return await db.actions.get(id);
    }
  }

  return null;
}

export async function getAllActions() {
  return await db.actions.toArray();
}

export async function clear() {
  await db.notes.clear();
}

export async function clearActions() {
  await db.actions.clear();
}

export async function populate(items) {
  await db.notes.bulkAdd(items);
}
