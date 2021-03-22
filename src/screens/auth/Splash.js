import React, { useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, Animated } from "react-native";
import { HebrootsLogo } from "../../components/atoms";
import { LoginRegister } from "../../components/templates";
import { check_for_token, timedAnimation, AuthContext } from "../../services";
import { Sizing, Typography } from "../../styles";

const Splash = () => {
  const logoY = useState(new Animated.Value(0))[0];
  const loginContainerOpacity = useState(new Animated.Value(0))[0];
  const sloganOpacity = useState(new Animated.Value(1))[0];

  const { autoLogin } = React.useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      attemptAutomaticSignIn();
    }, 1000);
  }, []);

  const attemptAutomaticSignIn = async () => {
    await check_for_token().then((token) => {
      token ? autoLogin(token) : displayLoginForms().start();
    });
  };

  const displayLoginForms = () => {
    const logoSlideUp = () => {
      return timedAnimation(logoY, 800, 1);
    };
    const loginFadeIn = () =>
      Animated.parallel([
        timedAnimation(loginContainerOpacity, 1000, 1),
        timedAnimation(sloganOpacity, 1000, 0),
      ]);
    return Animated.sequence([logoSlideUp(), loginFadeIn()]);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/Ulpan.png")}
        style={styles.image}
      >
        <View style={styles.overlay}></View>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: logoY.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, -Sizing.SCREEN_HEIGHT / 3, 0],
                  }),
                },
              ],
              zIndex: 1,
              position: "absolute",
              alignSelf: "center",
            },
          ]}
        >
          <HebrootsLogo />
        </Animated.View>
        <Animated.View
          style={{
            opacity: loginContainerOpacity,
            ...styles.formsContainer,
          }}
        >
          <LoginRegister />
        </Animated.View>
        <Animated.Text
          style={{
            ...styles.sloganContainer,
            opacity: sloganOpacity,
          }}
        >
          Learning Hebrew the root way
        </Animated.Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: Sizing.SCREEN_WIDTH,
    height: Sizing.SCREEN_HEIGHT,
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  overlay: {
    position: "absolute",
    width: Sizing.SCREEN_WIDTH,
    height: Sizing.SCREEN_HEIGHT,
    zIndex: 1,
    backgroundColor: "black",
    opacity: 0.4,
  },
  formsContainer: {
    zIndex: 3,
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: Sizing.SCREEN_HEIGHT / 4,
  },
  sloganContainer: {
    position: "absolute",
    bottom: Sizing.SCREEN_HEIGHT / 10,
    fontFamily: "Bodoni 72",
    ...Typography.size18,
    color: "white",
    alignSelf: "center",
    width: Sizing.SCREEN_WIDTH / 2,
    textAlign: "center",
  },
});

export default Splash;
