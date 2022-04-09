import { useCallback, useEffect, useState } from "react";
import "./NoteForm.css";

const initialState = {
  text: "",
};

export const NoteForm = (props) => {
  const [state, setState] = useState((props.note && props.note) || initialState);

  useEffect(() => {
    setState((props.note && props.note) || initialState);
  }, [setState, props.note]);

  const handleChange = useCallback((event) => {
    event.preventDefault();

    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      props.onSubmit({ ...state });

      setState(initialState);
    },
    [props, state, setState],
  );

  const handleReset = useCallback(
    (event) => {
      event.preventDefault();

      props.onReset();

      setState(initialState);
    },
    [props, setState],
  );

  return (
    <form
      className="NoteForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
      autoComplete="off"
    >
      <input
        type="text"
        name="text"
        onChange={handleChange}
        value={state.text}
        placeholder="Leave a note..."
        required
      />
      <button type="submit">Submit</button>
      <button type="reset">Clear</button>
    </form>
  );
};
