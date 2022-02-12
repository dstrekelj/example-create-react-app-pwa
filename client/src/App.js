import notes from "./mocks/notes.json";
import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";

export default function App() {
  return (
    <div>
      <NoteList notes={notes.data} onEdit={() => {}} onDelete={() => {}} />
      <NoteForm onSubmit={() => {}} onReset={() => {}} />
    </div>
  );
}
