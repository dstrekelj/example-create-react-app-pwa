import { useState, useCallback, useEffect } from "react";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

export const useServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [showReload, setShowReload] = useState(false);

  const onUpdate = useCallback((registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  }, []);

  const reloadPage = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
    setShowReload(false);
    window.location.reload();
  }, [waitingWorker]);

  useEffect(() => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.register({
      onUpdate: onUpdate,
    });
  }, [onUpdate]);

  return { showReload, waitingWorker, reloadPage };
};
