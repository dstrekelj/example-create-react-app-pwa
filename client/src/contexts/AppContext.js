import { createContext, useEffect, useCallback, useState, useMemo } from "react";
import { useApi } from "../hooks/useApi";

export const AppContext = createContext();
export const AppConsumer = AppContext.Consumer;

export const AppProvider = (props) => {
  const [note, setNote] = useState(null);
  const api = useApi();

  useEffect(() => {
    if (api.isStale && api.error === null) {
      (async () => await api.getNotes())();
    }
  }, [api]);

  const handleEdit = useCallback(
    (note) => () => {
      setNote(note);
    },
    [setNote],
  );

  const handleDelete = useCallback(
    (note) => async () => {
      await api.deleteNote(note.id);
    },
    [api],
  );

  const handleSubmit = useCallback(
    async (data) => {
      if (note !== null) {
        await api.putNote(note.id, data);
        setNote(null);
      } else {
        await api.postNote(data);
      }
    },
    [api, setNote, note],
  );

  const handleReset = useCallback(() => {
    setNote(null);
  }, [setNote]);

  const value = useMemo(
    () => ({
      note,
      notes: api.notes,
      error: api.error,
      handleDelete,
      handleEdit,
      handleReset,
      handleSubmit,
    }),
    [note, api, handleDelete, handleEdit, handleReset, handleSubmit],
  );

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
