import React, { useReducer } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  initialRegistrationState,
  registrationReducer,
  AuthContext
} from "../../../services";
import { Colors, Spacing, Typography } from "../../../styles";
import { RegistrationInput, StadiumButton } from "../../atoms";
import formStyles from "./styles";

const RegisterForm = ({ loginInstead }) => {
  const { attemptRegister, skipLogin, noUserFound } = React.useContext(
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
        <Text style={formStyles.title}>
          Enter the following registration details
        </Text>
        <View style={{ marginVertical: 15 }}>
          <RegistrationInput
            name="first_name"
            secured={false}
            icon="person"
            handleChange={fillInput}
          />
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
          <RegistrationInput
            name="confirm_password"
            secured={true}
            icon="key"
            handleChange={fillInput}
          />
        </View>
        <StadiumButton
          name="Sign up"
          onClick={() =>
            attemptRegister({
              email: state.email,
              password: state.password,
              confirmPassword: state.confirm_password,
              firstName: state.first_name,
            })
          }
          backgroundColor={Colors.hebrootsBlue}
        />
        <Text style={formStyles.errorText}>
          {noUserFound &&
            "Registration failed. A user with that email may already exist."}
        </Text>
      </View>
      <View style={formStyles.bottom}>
        <TouchableOpacity onPress={skipLogin}>
          <Text style={formStyles.important}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loginInstead} style={formStyles.row}>
          <Text style={formStyles.text}>already have an account?</Text>
          <Text style={formStyles.important}>Sign in</Text>
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
    flex: 5,
  },
});

export default RegisterForm;
