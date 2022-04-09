import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./ErrorNotification.css";

export const ErrorNotification = () => {
  const { error } = useContext(AppContext);

  if (!error) {
    return null;
  }

  return <div className="ErrorNotification">Error: {error.message}</div>;
};
