import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View, SafeAreaView, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import Bird from "../../Components/Characters/Bird";
import { requestAllPatterns } from "../../Actions/APIRequests";
import _3DButton from "../../Components/Buttons/_3DButton";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";

const LessonSelection = ({ navigation, route }) => {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    displayPatternsOnScreen();
  }, []);

  const displayPatternsOnScreen = async () => {
    const patterns = await requestAllPatterns();
    setTopics(patterns);
  };

  const onLessonSelect = (lesson) => {
    navToSubtopicSelection(lesson);
  };

  const navToSubtopicSelection = (lesson) => {
      console.log("navigating")
    navigation.navigate("SubtopicSelection", {
      pattern: lesson.pattern,
      name: lesson.name,
      aspects: lesson.aspects,
      infinitive_form: lesson.infinitive_form,
      pattern_id: lesson._id,
      transliteration: lesson.transliteration,
      type: lesson.type
    });
  };

  const renderItem = ({ item }) => (
    <_3DButton
      width={SCREEN_WIDTH - 60}
      height={SCREEN_HEIGHT / 11}
      textSize={24}
      color={"black"}
      backgroundColor={"white"}
      borderWidth={1}
      borderRadius={5}
      borderColor={"#C0C0C0"}
      backgroundShadow={"white"}
      backgroundDarker={"#C0C0C0"}
      backgroundActive={"#FFD350"}
      onPress={() => onLessonSelect(item)}
      name={item.name}
      details={[item.transliteration, item.aspects[0]]}
      enabled={true}
      style={{ marginVertical: 10 }}
      fontSize={SCREEN_HEIGHT / 55}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.intro}>
        <Bird size="Large" birdType="Old" style={{ top: 20, left: -25 }} />
        <Text
          style={{
            width: "65%",
            fontSize: SCREEN_HEIGHT / 35,
            textAlign: "center",
            fontFamily: "Nunito_300Light",
          }}
        >
          hi josh!
        </Text>
        <Text
          style={{
            width: "65%",
            fontSize: SCREEN_HEIGHT / 35,
            textAlign: "center",
            fontFamily: "Nunito_300Light",
          }}
        >
          let's learn about one of the following topics
        </Text>
      </View>
      <Animatable.View
        animation="fadeIn"
        direction="alternate"
        style={{ flex: 2 }}
      >
        {topics !== null ? (
          <FlatList
            data={topics}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            horizontal={false}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={true}
          />
        ) : 
        <View style={{height: SCREEN_HEIGHT/2,borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size='large'/>
                    </View>}
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "white",
  },
  intro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 40,
  },
  listItem: {
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 8,
  },
});

export default LessonSelection;
