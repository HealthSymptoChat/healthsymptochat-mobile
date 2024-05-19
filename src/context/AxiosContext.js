import React, { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { AuthContext } from "./AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";

const AxiosContext = createContext(null);

const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const baseURL = "http://10.0.2.2:5000/api/v1";

  const authAxios = axios.create({
    baseURL: baseURL,
  });

  const publicAxios = axios.create({
    baseURL: baseURL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext?.getAccessToken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      const {
        config,
        response: { status },
      } = error;
      const originalRequest = config;

      if (status === 403) {
        return refreshAuthLogic(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest) => {
    console.log("refreshing token");
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      method: "POST",
      data,
      url: "http://10.0.2.2:5000/api/v1/auth/token",
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization =
          "Bearer " + tokenRefreshResponse.data.accessToken;

        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await SecureStore.setItemAsync(
          "accessToken",
          tokenRefreshResponse.data.accessToken
        );
        await SecureStore.setItemAsync(
          "refreshToken",
          tokenRefreshResponse.data.refreshToken
        );
        return Promise.resolve();
      })
      .catch((e) => {
        authContext?.setAuthState({
          accessToken: null,
          refreshToken: null,
          // authenticated: false, // Add the 'authenticated' property
          // user: null, // Add the 'user' property
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
