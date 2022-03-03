import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";
import { useApi } from "./hooks/useApi";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [note, setNote] = useState(null);
  const api = useApi();

  useEffect(() => {
    if (api.isStale) {
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

  return (
    <div>
      {api.error && <div>Error: {api.error.message}</div>}
      <NoteList notes={api.notes} onEdit={handleEdit} onDelete={handleDelete} />
      <NoteForm note={note} onSubmit={handleSubmit} onReset={handleReset} />
    </div>
  );
}
