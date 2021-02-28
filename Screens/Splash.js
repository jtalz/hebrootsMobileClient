import React, { useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, Animated } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import HebrootsLogo from "../Components/HebrootsLogo";
import { normalize } from "../Actions/Normalize";
import LoginRegister from "../Containers/LoginRegister";
import check_for_token from "../Actions/Authentication/check_for_token";
import timedAnimation from "../Actions/Animations/timedAnimation";

const Splash = ({ noLogin, noUserFound, login }) => {
  useEffect(() => {
    setTimeout(() => {
      attemptAutomaticSignIn();
    }, 1000);
  }, []);

  const attemptAutomaticSignIn = async () => {
    await check_for_token().then((token) => {
      token ? login(token) : animateLoginForms().start();
    });
  };

  //Animated components
  const logoY = useState(new Animated.Value(0))[0];
  const loginContainerOpacity = useState(new Animated.Value(0))[0];
  const sloganOpacity = useState(new Animated.Value(1))[0];
  const [logoSize, setLogoSize] = useState(50);

  const animateLoginForms = () => {
    const logoSlideUp = () => {
      setLogoSize(30);
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
    <View style={{ ...styles.container }}>
      <ImageBackground
        source={require("../assets/Ulpan.png")}
        style={styles.image}
      >
        <View
          style={{
            position: "absolute",
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            zIndex: 1,
            backgroundColor: "black",
            opacity: 0.4,
          }}
        ></View>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: logoY.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, -SCREEN_HEIGHT / 3, 0],
                  }),
                },
              ],
              zIndex: 1,
              position: 'absolute',
              alignSelf: 'center'
            },
          ]}
        >
          <HebrootsLogo logoSize={logoSize} />
        </Animated.View>

        <Animated.View
          style={{
//            position: "absolute",
            opacity: loginContainerOpacity,
            zIndex: 3,
  //          bottom: SCREEN_HEIGHT/8,
            flex: 1,
            justifyContent: 'flex-end',
            paddingTop: SCREEN_HEIGHT/4
          }}
        >
          <LoginRegister noLogin={noLogin} noUserFound={noUserFound} />
        </Animated.View>

        <Animated.Text
          style={{
            position: "absolute",
            bottom: SCREEN_HEIGHT / 10,
            fontFamily: "Bodoni 72",
            fontSize: normalize(20),
            color: "white",
            alignSelf: "center",
            width: SCREEN_WIDTH / 2,
            textAlign: "center",
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
    alignItems: 'center'
  },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
});

export default Splash;
