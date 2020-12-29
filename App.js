import "react-native-gesture-handler";
import React, { useReducer, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "./StackScreens/AuthStack/SplashScreen";
import PatternStack from "./TabStacks/PatternStack";
import SearchStack from "./TabStacks/SearchStack";
import SettingsScreen from "./TabStacks/SettingsScreen";
import TrainingStack from "./TabStacks/TrainingStack";
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

const Tab = createBottomTabNavigator();

const App = () => {
  const [state, dispatch] = useReducer(authenticationReducer, initialAuthState);

  const login = (token) => {
    dispatch({ type: "LOGIN", token });
  };

  const authContext = useMemo(
    () => ({
      attemptLogin: async (form_data) => {
        await requestLogin(form_data)
          .then((res) => res.token ? storeTokenLogin(res.token) : dispatch({ type: "NO_USER_FOUND" }))
      },
      signOut: async () => {
        await remove_token();
        dispatch({ type: "LOGOUT" });
      },
      attemptRegister: async (form_data) => {
        await requestRegister(form_data)
          .then((res) => res.token ? storeTokenLogin(res.token) : dispatch({ type: "NO_USER_FOUND" }))
      },
      signInAgain: () => {
        dispatch({ type: "BACK2SPLASH" });
      },
    }),
    []
  );

  const storeTokenLogin = async (token) => {
      await store_token(token)
        .then(success => {login(token)})
  }

  const showSplashScreen_ = (userToken, continueWithoutSignin) => {
    if (userToken !== null || continueWithoutSignin !== false) 
      return false;
    else 
      return true;
  };

  return can_load_fonts() ? (
    <AppLoading />
  ) : (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {showSplashScreen_(state.userToken, state.continueWithoutSignin) ? (
          <SplashScreen
            isSignedIn={state.userToken !== null}
            noLogin={()=>{dispatch({ type: "NOLOGIN" })}}
            noUserFound={state.noUserFound}
            login={login}
          />
        ) : (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Explore") {
                  iconName = "ios-search";
                } else if (route.name === "Learn") {
                  iconName = "ios-school";
                } else if (route.name === "Progress") {
                  iconName = "ios-flash";
                } else if (route.name === "Settings") {
                  iconName = "ios-settings";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: "#2B78EC",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Explore" component={SearchStack} />
            <Tab.Screen name="Learn" component={PatternStack} />
            <Tab.Screen name="Progress" component={TrainingStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
