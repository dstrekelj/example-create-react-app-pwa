import { useCallback, useContext, useEffect, useState } from "react";
import * as remote from "../services/api";
import * as local from "../services/db";
import { DeviceContext } from "../contexts/DeviceContext";

export const useApi = () => {
  const { online } = useContext(DeviceContext);

  const [notes, setNotes] = useState([]);
  const [isStale, setIsStale] = useState(true);
  const [error, setError] = useState(null);

  const api = online ? remote : local;

  useEffect(() => {
    setIsStale(true);
  }, [online]);

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
        const note = await api.add({ text });
        if (online) {
          await local.add(note);
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
        }
        setIsStale(true);
      }),
    [api, online, handleError, setIsStale],
  );

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
