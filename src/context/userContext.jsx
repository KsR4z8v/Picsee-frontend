/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserContextProvider(props) {
  const [id, setId] = useState();
  const [logged, setLogged] = useState(false);
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("session"));
    if (user) {
      setLogged(true);
      setAvatar(user.urlAvatar);
      setId(user.userId);
      setUsername(user.username);
    }
  });

  return (
    <UserContext.Provider
      value={{ id, username, logged, avatar, setUsername, setLogged, setId }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
