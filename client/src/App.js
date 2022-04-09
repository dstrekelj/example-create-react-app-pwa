import { NoteForm } from "./components/NoteForm/NoteForm";
import { NoteList } from "./components/NoteList/NoteList";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import { UpdateNotification } from "./components/UpdateNotification/UpdateNotification";
import { NetworkStatusIndicator } from "./components/NetworkStatusIndicator";
import { ErrorNotification } from "./components/ErrorNotification";
import "./App.css";

export default function App() {
  const { note, notes, handleEdit, handleDelete, handleReset, handleSubmit } =
    useContext(AppContext);

  return (
    <div className="App">
      <NetworkStatusIndicator />
      <UpdateNotification />
      <ErrorNotification />
      <NoteForm note={note} onSubmit={handleSubmit} onReset={handleReset} />
      <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
