import React, { useReducer, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import {
  AuthContext,
  can_load_fonts,
  initialAuthState,
  remove_token,
  requestLogin,
  requestRegister,
  store_token,
  authenticationReducer,
} from "./src/services";
import { RootNavigator } from "./src/navigations/tabs";

const App = () => {
  const [state, dispatch] = useReducer(authenticationReducer, initialAuthState);

  const login = (token) => {
    dispatch({ type: "LOGIN", token });
  };

  const storeTokenLogin = (token) => {
    store_token(token).then((success) => login(token));
  };

  const authContext = useMemo(
    () => ({
      attemptLogin: (form_data) => {
        requestLogin(form_data).then((res) =>
          res.token
            ? storeTokenLogin(res.token)
            : dispatch({ type: "NO_USER_FOUND" })
        );
      },
      attemptRegister: (form_data) => {
        requestRegister(form_data).then((res) =>
          res.token
            ? storeTokenLogin(res.token)
            : dispatch({ type: "NO_USER_FOUND" })
        );
      },
      autoLogin: (token) => {
        login(token);
      },
      signOut: () => {
        remove_token().then((res) => dispatch({ type: "LOGOUT" }));
      },
      backToSplash: () => {
        dispatch({ type: "BACK2SPLASH" });
      },
      skipLogin: () => {
        dispatch({ type: "SKIPLOGIN" });
      },
      noUserFound: state.noUserFound,
    }),
    []
  );

  return can_load_fonts() ? (
    <AppLoading />
  ) : (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootNavigator
          userToken={state.userToken}
          skipSignin={state.skipSignin}
        />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
