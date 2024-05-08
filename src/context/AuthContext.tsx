import React, { createContext, useContext, useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
  user: any;
}

interface AuthContextProps {
  authState: AuthState;
  getAccessToken: () => string | null;
  setAuthState: (state: AuthState) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    user: null,
  });

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
      user: null,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, AuthContext };
