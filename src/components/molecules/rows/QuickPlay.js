import React, { useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { DropdownButton, IconButton } from "../../atoms";

const imageLinks = [
  'https://user-images.githubusercontent.com/31594943/100773708-3c6dae80-33cf-11eb-92a1-a74f19530b06.png',
  'https://user-images.githubusercontent.com/31594943/100773715-3e377200-33cf-11eb-8c5e-d8c17b6da0ab.png',
  'https://user-images.githubusercontent.com/31594943/100773724-40013580-33cf-11eb-92be-c0c5131c3048.png',
  'https://user-images.githubusercontent.com/31594943/100773778-51e2d880-33cf-11eb-8843-09711bc36486.png',
  'https://user-images.githubusercontent.com/31594943/100773858-6c1cb680-33cf-11eb-8f5c-454da0636f0d.png',
  'https://user-images.githubusercontent.com/31594943/100773862-6e7f1080-33cf-11eb-98c4-40ba6c099aad.png',
  'https://user-images.githubusercontent.com/31594943/100773869-7048d400-33cf-11eb-9414-60ef5e127114.png',
  'https://user-images.githubusercontent.com/31594943/100773922-80f94a00-33cf-11eb-87d4-43671e8a814a.png',
  'https://user-images.githubusercontent.com/31594943/100773928-82c30d80-33cf-11eb-925a-879bce276b73.png',
  'https://user-images.githubusercontent.com/31594943/100773932-848cd100-33cf-11eb-96c5-9987b3309f60.png',
  'https://user-images.githubusercontent.com/31594943/100773997-9a9a9180-33cf-11eb-9c8e-cc651ab188cb.png',
  'https://user-images.githubusercontent.com/31594943/100774002-9c645500-33cf-11eb-826e-14f518cc2ab1.png',
  'https://user-images.githubusercontent.com/31594943/100774005-9d958200-33cf-11eb-86ea-14fcf0428892.png',
  'https://user-images.githubusercontent.com/31594943/100774049-a9814400-33cf-11eb-812a-d8fd5dabbd75.png',
  'https://user-images.githubusercontent.com/31594943/100774054-abe39e00-33cf-11eb-96c8-a7d17d753d55.png',
  'https://user-images.githubusercontent.com/31594943/100774063-adad6180-33cf-11eb-8df2-936f2d9e5100.png',
  'https://user-images.githubusercontent.com/31594943/100774102-ba31ba00-33cf-11eb-9d0a-a904d32c5ab1.png',
  'https://user-images.githubusercontent.com/31594943/100774109-bbfb7d80-33cf-11eb-8d2c-7517a984d3f1.png',
  'https://user-images.githubusercontent.com/31594943/100774115-bdc54100-33cf-11eb-91bc-aec68cf12253.png',
  'https://user-images.githubusercontent.com/31594943/100774174-cd448a00-33cf-11eb-98b2-c53a10322461.png',
  'https://user-images.githubusercontent.com/31594943/100774185-d0d81100-33cf-11eb-943d-69692f042601.png',
  'https://user-images.githubusercontent.com/31594943/100774179-cf0e4d80-33cf-11eb-93d0-36a0aade7b22.png',
  'https://user-images.githubusercontent.com/31594943/100774255-e1888700-33cf-11eb-835c-a6fd800ef667.png',
  'https://user-images.githubusercontent.com/31594943/100774268-e2b9b400-33cf-11eb-854c-71980b1c317d.png',
  'https://user-images.githubusercontent.com/31594943/100774270-e4837780-33cf-11eb-9e2e-86826d6f7a7e.png',
  'https://user-images.githubusercontent.com/31594943/100774328-f533ed80-33cf-11eb-8218-d0b55800c6c4.png',
  'https://user-images.githubusercontent.com/31594943/100774333-f6651a80-33cf-11eb-8679-3fe1e940726b.png',
  'https://user-images.githubusercontent.com/31594943/100774341-f82ede00-33cf-11eb-9ed0-cde0c0a4ef91.png',
  'https://user-images.githubusercontent.com/31594943/100774412-0b41ae00-33d0-11eb-8081-158863f8002c.png',
  'https://user-images.githubusercontent.com/31594943/100774416-0c72db00-33d0-11eb-80dd-52de261a974e.png',
  'https://user-images.githubusercontent.com/31594943/100774424-0e3c9e80-33d0-11eb-914d-3ea4931750a0.png'
]

const getRandomImg = () => {
  const randomIndex = Math.floor(Math.random() * imageLinks.length)
  return imageLinks[randomIndex]
}

const QuickPlayRow = ({ tense, title, verbs, transliteration, quickPlay, index }) => {
  const animatedHeight = index == 0 ? new Animated.Value(160) : new Animated.Value(0);
  const [isOpen, setOpen] = index == 0 ? useState(true) : useState(false);

  const renderQuickPlayButton = ({ item }) => {
    return (
      <IconButton
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
      <DropdownButton
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

export default QuickPlayRow;
