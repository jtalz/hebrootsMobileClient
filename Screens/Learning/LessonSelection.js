import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import Bird from "../../Components/Characters/Bird";
import { requestAllPatterns } from "../../Actions/APIRequests";
import _3DButton from "../../Components/Buttons/_3DButton";
import {
  Typography,
  Colors,
  Buttons,
  Spacing,
  Sizing,
} from "../../styles/index";
import LoadingIndicator from "../../Components/LoadingIndicator";
import LongRectangleButton from "../../Components/Buttons/LongRectangleButton";

const LessonSelection = ({ navigation, route }) => {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    displayPatternsOnScreen();
  }, []);

  const displayPatternsOnScreen = () => {
    requestAllPatterns().then((patterns) => setTopics(patterns));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Bird size="Large" birdType="Old" style={{ top: 20, left: -25 }} />
        <Text style={styles.instructions}>
          Let's learn about one of the following topics
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
            contentContainerStyle={styles.buttonContainer}
            horizontal={false}
            numColumns={1}
            renderItem={({item}) => (
              <LongRectangleButton
                name={item.name}
                details={[item.transliteration, item.aspects[0]]}
                onPress={() =>
                  navigation.navigate("SubtopicSelection", {
                    pattern: item.pattern,
                    name: item.name,
                    aspects: item.aspects,
                    infinitive_form: item.infinitive_form,
                    pattern_id: item._id,
                    transliteration: item.transliteration,
                    type: item.type,
                  })
                }
              />
            )}
            keyExtractor={(item) => item._id}
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
    flex: 1,
    marginRight: 40,
    ...Spacing.justifyCenter,
    ...Spacing.alignEnd,
  },
  buttonContainer: {
    ...Spacing.centerCenter,
  },
  instructions: {
    ...Typography.largeEnLight,
    ...Typography.textAlignCenter,
  },
});

export default LessonSelection;
