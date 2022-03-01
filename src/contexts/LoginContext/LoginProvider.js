import LoginContext from "./index";

import useLoginProvider from "../../hooks/useLoginProvider";

export default function LoginProvider(props) {
  const login = useLoginProvider();

  return (
    <LoginContext.Provider value={login}>{props.children}</LoginContext.Provider>
  );
}