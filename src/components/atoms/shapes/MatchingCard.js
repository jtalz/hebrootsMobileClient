import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, Animated, StyleSheet } from "react-native";
import { timedAnimation } from "../../../services";
import { Colors, Spacing, Typography, Sizing } from "../../../styles/index";

const appropriateCardOpacity = (visible, justSubmittedAndIsCorrect) => {
  if (justSubmittedAndIsCorrect) {
    return new Animated.Value(1);
  } else if (!visible) {
    return new Animated.Value(0);
  } else {
    return new Animated.Value(1);
  }
};

const MatchingCard = ({ item, selectCard }) => {
  const { selected, visible, name, justSubmitted } = item;

  var disabled = !visible;

  const justSubmittedAndIsCorrect = justSubmitted && !visible;

  const justSubmittedAndIsIncorrect = justSubmitted && visible;

  const cardOpacity = useState(
    appropriateCardOpacity(visible, justSubmittedAndIsCorrect)
  )[0];

  const animatedValue = new Animated.Value(90);

  const fadeCardOut = () => timedAnimation(cardOpacity, 800, 0).start();

  const interpolateToWhite = () => {
    Animated.timing(animatedValue, {
      toValue: 255,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 250],
    outputRange: [Colors.red, "rgb(250, 250, 250)"],
  });

  const bgColor = {
    backgroundColor: appropriateCardColor(
      selected,
      justSubmittedAndIsCorrect,
      justSubmittedAndIsIncorrect
    ),
  };

  function appropriateCardColor(
    selected,
    justSubmittedAndIsCorrect,
    justSubmittedAndIsIncorrect
  ) {
    if (justSubmittedAndIsCorrect) {
      return Colors.green;
    } else if (justSubmittedAndIsIncorrect) {
      return interpolateColor;
    } else if (selected) {
      return Colors.hebrootsBlue;
    } else {
      return Colors.white;
    }
  }

  useEffect(() => {
    if (justSubmittedAndIsCorrect) {
      fadeCardOut();
    } else if (justSubmittedAndIsIncorrect) {
      interpolateToWhite();
    }
  });

  return (
    <TouchableOpacity
      style={styles.matchingCard}
      disabled={disabled}
      onPress={() => selectCard(item)}
    >
      <Animated.View
        style={[
          {
            opacity: cardOpacity,
            width: "100%",
            height: "100%",
            borderRadius: Sizing.SCREEN_HEIGHT / 18,
            justifyContent: "center",
          },
          bgColor,
        ]}
      >
        <Text style={styles.text}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  matchingCard: {
    height: Sizing.SCREEN_HEIGHT / 12,
    width: Sizing.SCREEN_WIDTH / 3.4,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderRadius: Sizing.SCREEN_HEIGHT / 18,
    ...Spacing.m5,
    ...Spacing.centerCenter,
  },
  text: {
    ...Typography.light,
    ...Typography.size18,
    alignSelf: "center",
  },
});

export default MatchingCard;
