import { useEffect, useState } from "react";
import { usuariosService } from "../../../services/usuarios.service";
import { httpClient } from "../../../util/Api";
// import { httpClient } from "../../../util/Api";

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
        if (data.statusCode === 200) {
          fetchSuccess();
          // httpClient.defaults.headers.common["Authorization"] =
          //   "Bearer " + data.token.access_token;
          localStorage.setItem(
            "token",
            JSON.stringify({
              ...data.body,
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
        fetchError(error.message);
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    // httpClient
    //   .post("auth/register", user)
    //   .then(({ data }) => {
    //     if (data.result) {
    fetchSuccess();
    // localStorage.setItem("token", data.token.access_token);
    // httpClient.defaults.headers.common["Authorization"] =
    //   "Bearer " + data.token.access_token;
    getAuthUser();
    if (callbackFun) callbackFun();
    //   } else {
    //     fetchError(data.error);
    //   }
    // })
    // .catch(function (error) {
    //   fetchError(error.message);
    // });
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
    // httpClient
    //   .post("auth/me")
    //   .then(({ data }) => {
    //     if (data.user) {
    fetchSuccess();
    setAuthUser(JSON.parse(token));
    //   } else {
    //     fetchError(data.error);
    //   }
    // })
    // .catch(function (error) {
    //   httpClient.defaults.headers.common["Authorization"] = "";
    //   fetchError(error.message);
    // });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (token) {
    //   httpClient.defaults.headers.common["Authorization"] = "Bearer " + token;
    // }

    // httpClient
    //   .post("auth/me")
    //   .then(({ data }) => {
    //     if (data.user) {
    setAuthUser(JSON.parse(token));
    // }
    setLoadingUser(false);
    // })
    // .catch(function () {
    //   localStorage.removeItem("token");
    //   httpClient.defaults.headers.common["Authorization"] = "";
    //   setLoadingUser(false);
    // });
  }, []);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
