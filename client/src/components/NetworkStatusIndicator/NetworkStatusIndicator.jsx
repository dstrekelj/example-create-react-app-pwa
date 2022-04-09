import { useContext } from "react";
import { DeviceContext } from "../../contexts/DeviceContext";
import "./NetworkStatusIndicator.css";

export const NetworkStatusIndicator = () => {
  const { online } = useContext(DeviceContext);

  return (
    <div className="NetworkStatusIndicator">
      The application is {online ? "online" : "offline"}
    </div>
  );
};
