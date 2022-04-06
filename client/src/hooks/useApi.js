import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as remote from "../services/api";
import * as local from "../services/db";
import { DeviceContext } from "../contexts/DeviceContext";

const SYNCHRONIZATION_TIMEOUT_MS = 5000;

export const useApi = () => {
  const { online } = useContext(DeviceContext);

  const [notes, setNotes] = useState([]);
  const [isStale, setIsStale] = useState(true);
  const [error, setError] = useState(null);

  const ref = useRef({ timeoutId: null });

  const api = online ? remote : local;

  const handleError = useCallback(
    async function (f) {
      try {
        await f();

        if (error) {
          setError(null);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    },
    [error, setError],
  );

  const getNotes = useCallback(
    async () =>
      handleError(async () => {
        const response = await api.getAll();
        setNotes(response);
        setIsStale(false);
      }),
    [api, handleError, setNotes, setIsStale],
  );

  const postNote = useCallback(
    async ({ text }) =>
      handleError(async () => {
        const { id, ...data } = await api.add({ text });
        if (online) {
          await local.add({ ...data, id });
        } else {
          await local.addAction(local.ActionTypeEnum.CREATE, id, data);
        }
        setIsStale(true);
      }),
    [api, online, handleError, setIsStale],
  );

  const putNote = useCallback(
    async (id, { text }) =>
      handleError(async () => {
        await api.put(id, { id, text });
        if (online) {
          await local.put(id, { id, text });
        } else {
          await local.addAction(local.ActionTypeEnum.UPDATE, id, { text });
        }
        setIsStale(true);
      }),
    [api, online, handleError, setIsStale],
  );

  const deleteNote = useCallback(
    async (id) =>
      handleError(async () => {
        await api.remove(id);
        if (online) {
          await local.remove(id);
        } else {
          await local.addAction(local.ActionTypeEnum.DELETE, id);
        }
        setIsStale(true);
      }),
    [api, online, handleError, setIsStale],
  );

  const synchronise = useCallback(
    async () =>
      handleError(async () => {
        const actions = await local.getAllActions();

        for (const action of actions) {
          switch (action.actionType) {
            case local.ActionTypeEnum.CREATE:
              await remote.add(action.data);
              break;
            case local.ActionTypeEnum.DELETE:
              await remote.remove(action.id);
              break;
            case local.ActionTypeEnum.UPDATE:
              await remote.put(action.id, action.data);
              break;
            default:
          }
        }

        await local.clear();
        await local.clearActions();

        const notes = await remote.getAll();
        await local.populate(notes);
      }),
    [handleError],
  );

  useEffect(() => {
    (async () => {
      if (online && !ref.current.timeoutId) {
        ref.current.timeoutId = setTimeout(
          async () => {
            try {
              await synchronise();
            } finally {
              ref.current.timeoutId = null;
            }
          },
          error ? SYNCHRONIZATION_TIMEOUT_MS : 0,
        );
      }
    })();
  }, [online, error, synchronise]);

  return {
    getNotes,
    postNote,
    putNote,
    deleteNote,
    notes,
    isStale,
    error,
  };
};
