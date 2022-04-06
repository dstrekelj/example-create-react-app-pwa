import React from "react";

export function useNetworkStatus() {
  const [state, setState] = React.useState(navigator.onLine);

  const callback = React.useCallback(() => {
    setState(navigator.onLine);
  }, [setState]);

  React.useEffect(() => {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);

    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  }, [callback]);

  return [state];
}
