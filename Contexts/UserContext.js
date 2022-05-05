import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    isLogged: false,
    username: null,
    token: null
  });

  return (
    <UserContext.Provider value={[user, setUser]} >
      {props.children}
    </UserContext.Provider>
  );
};