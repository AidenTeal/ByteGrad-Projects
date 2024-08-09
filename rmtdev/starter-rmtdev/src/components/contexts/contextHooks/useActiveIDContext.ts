import { useContext } from "react";
import { ActiveIDContext } from "../ActiveIDContextProvider";

export function useActiveIDContext() {
  const context = useContext(ActiveIDContext);
  // console.log("Context:", context); // Debugging line
  if (!context) {
    throw new Error("ActiveIDContext is not found");
  }

  const { activeID } = context;

  return { activeID };
}
