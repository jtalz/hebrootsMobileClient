import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { normalize } from "../Actions/Normalize";
import SmallYellowButton from "../Components/Buttons/SmallYellowButton";
import LoginInput from "../Components/LoginInput";
import { Colors, Spacing, Typography } from "../styles";
import { hebrootsBlue } from "../styles/colors";

const RegisterForm = ({
  loginInstead,
  noLogin,
  handleChange,
  register,
  noUserFound,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.title}>Enter the following registration details</Text>
        <View style={{ marginVertical: 15 }}>
          <LoginInput
            name="first_name"
            secured={false}
            icon="person"
            handleChange={handleChange}
          />
          <LoginInput
            name="email"
            secured={false}
            icon="email"
            handleChange={handleChange}
          />
          <LoginInput
            name="password"
            secured={true}
            icon="key"
            handleChange={handleChange}
          />
          <LoginInput
            name="confirm_password"
            secured={true}
            icon="key"
            handleChange={handleChange}
          />
        </View>
        <SmallYellowButton
          name="Sign up"
          onClick={register}
          backgroundColor={hebrootsBlue}
        />
        <Text style={styles.errorText}>
          {noUserFound ? "Registration failed. A user with that email may already exist." : ""}
        </Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => noLogin()}>
          <Text style={styles.important}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => loginInstead()} style={styles.row}>
          <Text style={styles.text}>already have an account?</Text>
          <Text style={styles.important}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Typography.size14,
    ...Colors.txtWhite,
    ...Typography.taCenter,
    ...Spacing.p5,
  },
  top: {
    ...Spacing.centerCenter,
    paddingVertical: 20,
    //backgroundColor: 'rgba(81, 140, 189, 0.5)',
    borderRadius: 2,
    flex: 5,
  },
  bottom: {
    marginVertical: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    alignSelf: "center",
    paddingTop: 10,
    color: "white",
    fontSize: normalize(12),
    ...Typography.light,
  },
  errorText: {
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    color: "red",
    ...Typography.semibold,
  },
  important: {
    alignSelf: "center",
    paddingTop: 10,
    fontSize: normalize(12),
    color: Colors.hebrootsBlue,
    ...Typography.semibold,
  },
  row: {
    ...Spacing.row,
    justifyContent: "center",
  },
});

export default RegisterForm;
