import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

export default function App() {
  const { note, notes, error, handleEdit, handleDelete, handleReset, handleSubmit } =
    useContext(AppContext);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
      <NoteForm note={note} onSubmit={handleSubmit} onReset={handleReset} />
    </div>
  );
}
