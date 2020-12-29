import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { normalize } from "../Actions/Normalize";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import SmallYellowButton from "../Components/Buttons/SmallYellowButton";
import AuthContext from "../Actions/context/AuthContext";
/* import * as Google from 'expo-google-app-auth'; */

/* const googlesignIn = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: `<YOUR_IOS_CLIENT_ID_FOR_EXPO>`,
        androidClientId: `<YOUR_ANDROID_CLIENT_ID_FOR_EXPO>`,
      });

      if (type === 'success') {
        
        console.log(user);
      }
  }; */

const LoginForm = ({
  signUpInstead,
  noLogin,
  handleChange,
  login,
  noUserFound,
}) => {
  return (
    <>
      <View style={{ ...styles.container, flex: 0.8 }}>
        <Text style={{ ...styles.title, ...styles.font }}>Sign in</Text>
        <TextInput
          style={{ ...styles.textBox, ...styles.font }}
          placeholder="email..."
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={{ ...styles.textBox, ...styles.font }}
          placeholder="password..."
          secureTextEntry={true}
          onChangeText={(text) => handleChange("password", text)}
        />
        <SmallYellowButton name="Sign in" onClick={login} />
        <Text
          style={{
            position: "absolute",
            bottom: 0,
            textAlign: "center",
            color: "red",
          }}
        >
          {noUserFound ? "We couldn't find a user with that combination" : ""}
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={() => noLogin()}>
          <Text style={{ ...styles.underlyingText, ...styles.font }}>
            continue without logging in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signUpInstead()}>
          <Text style={{ ...styles.underlyingText, ...styles.font }}>
            don't have an account? sign up
          </Text>
        </TouchableOpacity>
        <Text style={{ ...styles.underlyingText, ...styles.font }}>
          forgot password?
        </Text>
      </View>
    </>
  );
};

const RegisterForm = ({ loginInstead, noLogin, handleChange, register, noUserFound }) => {
  return (
    <>
      <View style={{ ...styles.container, flex: 1 }}>
        <Text style={{ ...styles.title, ...styles.font }}>Sign up</Text>
        <TextInput
          style={{ ...styles.textBox, ...styles.font }}
          placeholder="first name..."
          onChangeText={(text) => handleChange("firstName", text)}
        />
        <TextInput
          style={{ ...styles.textBox, ...styles.font }}
          placeholder="email..."
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={{ ...styles.textBox, ...styles.font }}
          placeholder="password..."
          secureTextEntry={true}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TextInput
          style={{ ...styles.textBox, ...styles.font }}
          placeholder="confirm password..."
          secureTextEntry={true}
          onChangeText={(text) => handleChange("confirmPassword", text)}
        />
        <SmallYellowButton name="Sign up" onClick={register} />
        <Text
          style={{
            position: "absolute",
            bottom: 0,
            textAlign: "center",
            color: "red",
          }}
        >
          {noUserFound ? "Registration failed. A user with that email may already exist." : ""}
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={() => noLogin()}>
          <Text style={{ ...styles.underlyingText, ...styles.font }}>
            continue without logging in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => loginInstead()}>
          <Text style={{ ...styles.underlyingText, ...styles.font }}>
            already have an account? sign in
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const initialState = {
  loginStatus: "login",
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
};

const LoginRegister = ({ noLogin, noUserFound }) => {
  const [state, setState] = useState(initialState);
  const toggleLoginStatus = () => {
    state.loginStatus == "login"
      ? setState({ ...state, loginStatus: "signUp" })
      : setState({ ...state, loginStatus: "login" });
  };
  const { attemptRegister, attemptLogin } = React.useContext(AuthContext);

  const handleChange = (field, text) => {
    switch (field) {
      case "email":
        setState({ ...state, email: text });
        break;
      case "password":
        setState({ ...state, password: text });
        break;
      case "confirmPassword":
        setState({ ...state, confirmPassword: text });
        break;
      case "firstName":
        setState({ ...state, firstName: text });
        break;
      default:
        console.log("no change handled");
        break;
    }
  };
  //logStatus can be 'log in' or 'sign up' this case two different forms are rendered
  return (
    <View
      style={{
        width: SCREEN_WIDTH / 1.5,
        height: SCREEN_HEIGHT / 1.8,
        borderRadius: 5,
        justifyContent: "center",
      }}
    >
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
              confirmPassword: state.confirmPassword,
              firstName: state.firstName,
            });
          }}
          noUserFound={noUserFound}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    fontSize: normalize(14),
    textAlign: "left",
    width: SCREEN_WIDTH / 2,
    borderBottomWidth: 1,
    padding: 10
  },
  title: {
    fontSize: normalize(20),
  },
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    //backgroundColor: 'rgba(81, 140, 189, 0.5)',
    borderRadius: 2,
  },
  underlyingText: {
    alignSelf: "center",
    paddingTop: 10,
    color: "white",
    fontSize: normalize(12),
  },
  font: {
    fontFamily: "Nunito_300Light",
  },
});

export default LoginRegister;
