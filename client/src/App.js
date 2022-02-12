import notes from "./mocks/notes.json";
import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";
import { useCallback, useState } from "react";

export default function App() {
  const [note, setNote] = useState(null);

  const handleEdit = useCallback(
    (note) => () => {
      console.log("Edit", note);
      setNote(note);
    },
    [],
  );

  const handleDelete = useCallback(
    (note) => () => {
      console.log("Delete", note);
    },
    [],
  );

  const handleSubmit = useCallback((data) => {
    console.log("Submit", data);
    setNote(null);
  }, []);

  const handleReset = useCallback(() => {
    console.log("Reset");
    setNote(null);
  }, []);

  return (
    <div>
      <NoteList notes={notes.data} onEdit={handleEdit} onDelete={handleDelete} />
      <NoteForm note={note} onSubmit={handleSubmit} onReset={handleReset} />
    </div>
  );
}
