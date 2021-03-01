import React, { useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import getRandomImg from "../Actions/GetMethods/GetRandomImage";
import QuickPlayButton from "../Components/Buttons/QuickPlayButton";
import TabButton from "../Components/Buttons/TabButton";

const QuickPlayTab = ({ tense, title, verbs, transliteration, quickPlay }) => {
  const animatedHeight = new Animated.Value(160);
  const [isOpen, setOpen] = useState(true);

  const renderQuickPlayButton = ({ item }) => {
    return (
      <QuickPlayButton
        name={item.infinitive}
        translation={item.translation}
        imgUrl={getRandomImg()}
        onPress={() => quickPlay(item, tense)}
      />
    );
  };

  const openPracticeTab = () => {
    Animated.timing(animatedHeight, {
      toValue: 160,
      useNativeDriver: false,
    }).start(() => {
      setOpen(!isOpen);
    });
  };

  const closePracticeTab = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      useNativeDriver: false,
    }).start(() => {
      setOpen(!isOpen);
    });
  };

  return (
    <View style={styles.container}>
      <TabButton
        isOpen={isOpen}
        title={title}
        transliteration={transliteration}
        closePracticeTab={closePracticeTab}
        openPracticeTab={openPracticeTab}
      />
      <Animated.View
        style={[
          styles.practiceTab,
          {
            height: animatedHeight,
          },
        ]}
      >
        <FlatList
          data={verbs}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          horizontal={true}
          renderItem={renderQuickPlayButton}
          keyExtractor={(item) => item._id}
          scrollEnabled={true}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
});

export default QuickPlayTab;
