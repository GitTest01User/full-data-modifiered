import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  var LoginUser = useSelector((state) => state.Login.value);

  var TrashData = useSelector((state) => state.Trash.value);
  var DeleteData = useSelector((state) => state.Delete.value);
  var user = LoginUser.result;

  const isLoginInTC = () => {
    if (LoginUser === null) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginInTC,
        user,
        TrashData,
        DeleteData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error('Token Is Not Fonud');
  }
  return authContextValue;
};
