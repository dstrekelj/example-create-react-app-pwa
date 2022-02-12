export const NoteList = (props) => {
  if (!Array.isArray(props.notes) || props.notes.length === 0) {
    return <div>Empty</div>;
  }

  return (
    <div>
      {props.notes.map((note) => (
        <div key={note.id}>
          <span>{note.text}</span>
          <button onClick={props.onEdit(note)}>Edit</button>
          <button onClick={props.onDelete(note)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
