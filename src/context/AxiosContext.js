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
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshAuthLogic().then((token) => {
          authAxios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return authAxios(originalRequest);
        });
      }
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = () => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      method: "POST",
      data,
      url: "http://10.0.2.2:5000/api/v1/auth/token",
    };

    return axios(options)
      .then((res) => {
        authContext.setAuthState({
          ...authContext.authState,
          accessToken: res.data.data,
        });
        console.log("refreshed token", res.data.message);
        return res.data.data;
      })
      .catch((error) => {
        console.log("error refreshing token", error);
        // authContext.logout();
        return Promise.reject();
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
