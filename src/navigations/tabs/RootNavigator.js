import React from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const RootNavigator = ({ userToken, skipSignin }) => {
  if (userToken || skipSignin) return <AppNavigator />;
  else return <AuthNavigator />;
};

export default RootNavigator;
