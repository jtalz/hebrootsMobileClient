import "react-native-gesture-handler";
import React, { useReducer, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./Screens/Splash";
import PatternStack from "./Navigators/TabStacks/PatternStack";
import SearchStack from "./Navigators/TabStacks/SearchStack";
import SettingsScreen from "./Navigators/TabStacks/SettingsScreen";
import TrainingStack from "./Navigators/TabStacks/TrainingStack";
import AuthContext from "./Actions/context/AuthContext";
import { requestLogin, requestRegister } from "./Actions/APIRequests";
import store_token from "./Actions/Authentication/store_token";
import {
  authenticationReducer,
  initialAuthState,
} from "./Actions/Reducers/AuthenticationReducer";
import can_load_fonts from "./Actions/LoadFonts";
import { AppLoading } from "expo";
import remove_token from "./Actions/Authentication/remove_token";
import HebrootsTabNav from "./Navigators/HebrootsTabNav";

const showSplash_ = (userToken, continueWithoutSignin) => {
  if (userToken !== null || continueWithoutSignin !== false) return false;
  else return true;
};
const Tab = createBottomTabNavigator();
const App = () => {
  const [state, dispatch] = useReducer(authenticationReducer, initialAuthState);

  const login = (token) => {
    dispatch({ type: "LOGIN", token });
  };

  const authContext = useMemo(
    () => ({
      attemptLogin: async (form_data) => {
        await requestLogin(form_data).then((res) =>
          res.token
            ? storeTokenLogin(res.token)
            : dispatch({ type: "NO_USER_FOUND" })
        );
      },
      attemptRegister: async (form_data) => {
        await requestRegister(form_data).then((res) =>
          res.token
            ? storeTokenLogin(res.token)
            : dispatch({ type: "NO_USER_FOUND" })
        );
      },
      signOut: async () => {
        await remove_token().then((res) => dispatch({ type: "LOGOUT" }));
      },
      signInAgain: () => {
        dispatch({ type: "BACK2SPLASH" });
      },
    }),
    []
  );

  const storeTokenLogin = async (token) => {
    await store_token(token).then((success) => login(token));
  };

  return can_load_fonts() ? (
    <AppLoading />
  ) : (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {showSplash_(state.userToken, state.continueWithoutSignin) ? (
          <Splash
            isSignedIn={state.userToken !== null}
            noLogin={() => {
              dispatch({ type: "NOLOGIN" });
            }}
            noUserFound={state.noUserFound}
            login={login}
          />
        ) : (
          <HebrootsTabNav Tab={Tab}>
            <Tab.Screen name="Explore" component={SearchStack} />
            <Tab.Screen name="Play" component={TrainingStack} />
            <Tab.Screen name="Learn" component={PatternStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </HebrootsTabNav>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
