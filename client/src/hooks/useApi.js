import { useCallback, useState } from "react";
import * as api from "../services/api";

export const useApi = () => {
  const [notes, setNotes] = useState([]);
  const [isStale, setIsStale] = useState(true);
  const [error, setError] = useState(null);

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
    [handleError, setNotes, setIsStale],
  );

  const postNote = useCallback(
    async ({ text }) =>
      handleError(async () => {
        await api.add({ text });
        setIsStale(true);
      }),
    [handleError, setIsStale],
  );

  const putNote = useCallback(
    async (id, { text }) =>
      handleError(async () => {
        await api.put(id, { id, text });
        setIsStale(true);
      }),
    [handleError, setIsStale],
  );

  const deleteNote = useCallback(
    async (id) =>
      handleError(async () => {
        await api.remove(id);
        setIsStale(true);
      }),
    [handleError, setIsStale],
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
