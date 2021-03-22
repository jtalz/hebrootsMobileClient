import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { LoginForm, RegisterForm } from "../organisms";
import { Sizing, Spacing } from "../../styles";

const LoginRegister = () => {
  const [loginStatus, setLoginStatus] = useState("login"); //login or register

  const toggleLoginStatus = () =>
    loginStatus == "login" ? setLoginStatus("register") : setLoginStatus("login");

  return (
    <View style={styles.container}>
      {loginStatus == "login" ? (
        <LoginForm signUpInstead={toggleLoginStatus} />
      ) : (
        <RegisterForm loginInstead={toggleLoginStatus} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Sizing.f1,
    width: Sizing.SCREEN_WIDTH / 1.5,
    borderRadius: 5,
    ...Spacing.justifyCenter,
  },
});

export default LoginRegister;
