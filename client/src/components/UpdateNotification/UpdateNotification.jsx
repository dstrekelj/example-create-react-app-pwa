import { useServiceWorker } from "../../hooks/useServiceWorker";
import "./UpdateNotification.css";

export const UpdateNotification = () => {
  const serviceWorker = useServiceWorker();

  if (!(serviceWorker.showReload && serviceWorker.waitingWorker)) {
    return null;
  }

  return (
    <div className="UpdateNotification">
      A new version is available.{" "}
      <button onClick={serviceWorker.reloadPage}>Reload</button>
    </div>
  );
};
