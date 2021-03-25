import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import { Bird, LessonButton, LoadingIndicator } from "../../components/atoms";
import { requestAllPatterns } from "../../services";
import { Typography, Colors, Spacing, Sizing } from "../../styles/index";

const LessonSelectionScreen = ({ navigation, route }) => {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    displayPatternsOnScreen();
  }, []);

  const displayPatternsOnScreen = () => {
    requestAllPatterns().then((patterns) => setTopics(patterns));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View
        animation="fadeIn"
        direction="alternate"
        style={{ flex: 2 }}
      >
        {topics !== null ? (
          <FlatList
            data={topics}
            contentContainerStyle={styles.buttonContainer}
            horizontal={false}
            numColumns={1}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.instructions}>Learn about binyaanim</Text>
                <Text style={styles.subStructions}>
                  The following options will provide you with custom videos and
                  lessons
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <LessonButton
                name={`${item.name} (${item.transliteration})`}
                details={[item.tense_en, item.aspects[0]]}
                onPress={() =>
                  navigation.navigate("PatternLesson", {
                    pattern: item.pattern,
                    name: item.name,
                    aspects: item.aspects,
                    infinitive_form: item.infinitive_form,
                    pattern_id: item._id,
                    transliteration: item.transliteration,
                    type: item.type,
                    subtopic: item.tense_en.toUpperCase(),
                  })
                }
              />
            )}
            keyExtractor={(item) => item._id + item.name + item.tense_en}
            scrollEnabled={true}
          />
        ) : (
          <LoadingIndicator />
        )}
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Spacing.justifyEnd,
    ...Sizing.width100,
    ...Colors.whiteBg,
  },
  header: {
    height: Sizing.SCREEN_HEIGHT / 4,
    ...Spacing.justifyCenter,
    ...Spacing.alignCenter,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  buttonContainer: {
    ...Spacing.alignEnd,
  },
  instructions: {
    ...Typography.textAlignCenter,
    ...Typography.light,
    ...Typography.size16,
    paddingHorizontal: 50,
    ...Colors.txtMagenta,
    marginVertical: 5,
  },
  subStructions: {
    ...Typography.textAlignCenter,
    ...Typography.light,
    ...Typography.size12,
    paddingHorizontal: 50,
    ...Colors.txtMagenta,
    marginVertical: 5,
  },
});

export default LessonSelectionScreen;
