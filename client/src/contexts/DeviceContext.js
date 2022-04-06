import React from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export const DeviceContext = React.createContext();
export const DeviceConsumer = DeviceContext.Consumer;

export const DeviceProvider = (props) => {
  const [networkStatus] = useNetworkStatus();

  const value = React.useMemo(
    () => ({
      online: networkStatus,
    }),
    [networkStatus],
  );

  return <DeviceContext.Provider value={value}>{props.children}</DeviceContext.Provider>;
};
