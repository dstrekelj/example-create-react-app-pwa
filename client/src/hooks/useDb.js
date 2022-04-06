import { useCallback, useState } from "react";
import * as db from "../services/db";

export const useDb = () => {
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
        const response = await db.getAll();
        setNotes(response);
        setIsStale(false);
      }),
    [handleError, setNotes, setIsStale],
  );

  const postNote = useCallback(
    async ({ text }) =>
      handleError(async () => {
        await db.add({ text });
        setIsStale(true);
      }),
    [handleError, setIsStale],
  );

  const putNote = useCallback(
    async (id, { text }) =>
      handleError(async () => {
        await db.put(id, { id, text });
        setIsStale(true);
      }),
    [handleError, setIsStale],
  );

  const deleteNote = useCallback(
    async (id) =>
      handleError(async () => {
        await db.remove(id);
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
