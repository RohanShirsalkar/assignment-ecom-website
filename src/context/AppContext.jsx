import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let userId = localStorage.getItem("user");
    if (userId) {
      setUser(userId);
    }
  }, []);

  const setUserData = (data) => {
    setUser(data);
    localStorage.setItem("user", data);
  };

  const values = { user, setUser, setUserData };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
