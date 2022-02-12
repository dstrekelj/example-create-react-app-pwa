export const NoteForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} onReset={props.onReset}>
      <input type="text" name="text" required />
      <button type="submit">Submit</button>
      <button type="reset">Clear</button>
    </form>
  );
};
