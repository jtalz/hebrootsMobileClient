import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import AuthContext from "../Actions/context/AuthContext";
import { Sizing, Spacing } from "../styles";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const initialState = {
  loginStatus: "login",
  email: "",
  password: "",
  confirm_password: "",
  first_name: "",
};

const LoginRegister = ({ noLogin, noUserFound }) => {
  const [state, setState] = useState(initialState);

  const { attemptRegister, attemptLogin } = React.useContext(AuthContext);

  const toggleLoginStatus = () => {
    state.loginStatus == "login"
      ? setState({ ...state, loginStatus: "signUp" })
      : setState({ ...state, loginStatus: "login" });
  };

  const handleChange = (field, text) => {
    switch (field) {
      case "email":
        setState({ ...state, email: text });
        break;
      case "password":
        setState({ ...state, password: text });
        break;
      case "confirm_password":
        setState({ ...state, confirm_password: text });
        break;
      case "first_name":
        setState({ ...state, first_name: text });
        break;
      default:
        console.log("no change handled");
        break;
    }
  };
  //logStatus can be 'log in' or 'sign up' this case two different forms are rendered
  return (
    <View style={styles.container}>
      {state.loginStatus == "login" ? (
        <LoginForm
          signUpInstead={toggleLoginStatus}
          noLogin={noLogin}
          handleChange={handleChange}
          login={() => {
            attemptLogin({ email: state.email, password: state.password });
          }}
          noUserFound={noUserFound}
        />
      ) : (
        <RegisterForm
          loginInstead={toggleLoginStatus}
          noLogin={noLogin}
          handleChange={handleChange}
          register={() => {
            attemptRegister({
              email: state.email,
              password: state.password,
              confirmPassword: state.confirm_password,
              firstName: state.first_name,
            });
          }}
          noUserFound={noUserFound}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Sizing.f1,
    width: SCREEN_WIDTH / 1.5,
    borderRadius: 5,
    ...Spacing.justifyCenter,
  },
});

export default LoginRegister;
