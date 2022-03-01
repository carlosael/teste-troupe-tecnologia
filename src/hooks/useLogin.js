import { useContext } from "react";

import LoginContext from "../contexts/LoginContext";

export default function useLogin() {
  return useContext(LoginContext);
}