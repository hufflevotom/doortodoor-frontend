import { useEffect, useState } from "react";
import { usuariosService } from "../../../services/usuarios.service";
import { httpClient } from "../../../util/Api";

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const fetchStart = () => {
    setLoading(true);
    setError("");
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError("");
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userLogin = (user, callbackFun) => {
    fetchStart();
    usuariosService
      .login(user)
      .then(({ data }) => {
        if (data.access_token) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.access_token;
          localStorage.setItem(
            "token",
            JSON.stringify({
              ...data.user._doc,
              token: data.access_token,
              modulos: [
                "inicio",
                "monitoreo",
                "evidencias",
                "folios",
                "usuarios",
                "vehiculos",
              ],
            })
          );
          getAuthUser();
          if (callbackFun) callbackFun();
        }
      })
      .catch(function (error) {
        fetchError(error.response.data.message);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    fetchStart();
    // httpClient
    //   .post("auth/logout")
    //   .then(({ data }) => {
    //     if (data.result) {
    fetchSuccess();
    //       httpClient.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    setAuthUser(false);
    if (callbackFun) callbackFun();
    //   } else {
    //     fetchError(data.error);
    //   }
    // })
    // .catch(function (error) {
    //   fetchError(error.message);
    // });
  };

  const getAuthUser = () => {
    const token = localStorage.getItem("token");
    fetchStart();
    fetchSuccess();
    setAuthUser(JSON.parse(token));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] =
        "Bearer " + JSON.parse(token).token;
      const userToken = JSON.parse(token).token;
      usuariosService
        .getToken(userToken)
        .then(({ data }) => {
          if (data.access_token) {
            setAuthUser(JSON.parse(token));
          }
          setLoadingUser(false);
        })
        .catch(function () {
          localStorage.removeItem("token");
          httpClient.defaults.headers.common["Authorization"] = "";
          setAuthUser(false);
          setLoadingUser(false);
        });
    }
    setAuthUser(JSON.parse(token));
    setLoadingUser(false);
  }, []);

  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
