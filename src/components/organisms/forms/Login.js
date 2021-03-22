import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  AuthContext,
  initialRegistrationState,
  registrationReducer,
} from "../../../services";
import { Colors, Spacing, Typography } from "../../../styles";
import { RegistrationInput, StadiumButton } from "../../atoms";
import formStyles from "./styles";

const LoginForm = ({ signUpInstead }) => {
  const { attemptLogin, skipLogin, noUserFound } = React.useContext(
    AuthContext
  );
  const [state, dispatch] = useReducer(
    registrationReducer,
    initialRegistrationState
  );

  const fillInput = (type, payload) => dispatch({ type, payload });
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={formStyles.title}>Enter your email & password</Text>
        <View style={{ marginVertical: 15 }}>
          <RegistrationInput
            name="email"
            secured={false}
            icon="email"
            handleChange={fillInput}
          />
          <RegistrationInput
            name="password"
            secured={true}
            icon="key"
            handleChange={fillInput}
          />
        </View>
        <StadiumButton
          name="Sign in"
          onClick={() =>
            attemptLogin({ email: state.email, password: state.password })
          }
          backgroundColor={Colors.hebrootsBlue}
        />
        <Text style={formStyles.errorText}>
          {noUserFound && "We couldn't find a user with that combination"}
        </Text>
      </View>
      <View style={formStyles.bottom}>
        <TouchableOpacity style={formStyles.row}>
          <Text style={formStyles.text}>forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipLogin}>
          <Text style={formStyles.important}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signUpInstead} style={formStyles.row}>
          <Text style={formStyles.text}>don't have an account?</Text>
          <Text style={formStyles.important}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    ...Spacing.centerCenter,
    paddingVertical: 20,
    borderRadius: 2,
    flex: 2,
  },
});

export default LoginForm;
