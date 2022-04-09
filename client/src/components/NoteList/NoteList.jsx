import "./NoteList.css";

export const NoteList = (props) => {
  if (!Array.isArray(props.notes) || props.notes.length === 0) {
    return (
      <div className="NoteList NoteList--empty">
        <div>Empty</div>
      </div>
    );
  }

  return (
    <div className="NoteList">
      {props.notes.map((note) => (
        <div key={note.id}>
          <div>{note.text}</div>
          <div>
            <button onClick={props.onEdit(note)}>Edit</button>
            <button onClick={props.onDelete(note)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
