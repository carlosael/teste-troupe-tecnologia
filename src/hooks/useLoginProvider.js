import { useLocalStorage } from 'react-use'

export default function useLoginProvider() {
  const [token, setToken, removeToken] = useLocalStorage('token', '');

  const logout = (callback) => {
    removeToken()
    callback();
  };

  return {
    logout,
    token, setToken, removeToken
  };
}