import { createContext } from "react";
import { useActiveID } from "../lib/hooks";

interface ActiveIDContextProps {
  activeID: number | null;
}

export const ActiveIDContext = createContext<ActiveIDContextProps | null>(null);

export default function ActiveIDContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeID = useActiveID();

  return (
    <ActiveIDContext.Provider
      value={{
        activeID,
      }}
    >
      {children}
    </ActiveIDContext.Provider>
  );
}
