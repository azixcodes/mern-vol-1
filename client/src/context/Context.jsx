import { createContext, useContext } from "react";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  let name = "Aziz";
  return <AppContext.Provider value={{ name }}>{children}</AppContext.Provider>;
};
export const Store = () => useContext(AppContext);
