import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CardsCarousel from "./CardsCarousel";
import { requestInfinitiveTranslation } from "../Actions/APIRequests";
import { Typography } from "../styles";

const StudySection = ({
  tableStatus,
  tableData,
  subtopic,
  setActiveIndex,
  activeIndex,
  definedTranslation,
}) => {
  const [translatedInfinitive, setTranslatedInfinitive] = useState();

  const getTranslatedInfinitive = (infinitive) => {
    requestInfinitiveTranslation(infinitive).then((translation) =>
      setTranslatedInfinitive(translation.translation)
    );
  };

  useEffect(() => {
    if (tableStatus == "Found" && definedTranslation == undefined) {
      getTranslatedInfinitive(tableData.infinitive);
    } else {
      setTranslatedInfinitive(definedTranslation);
    }
  }, [tableData.infinitive]);

  if (tableStatus == "Loading") {
    return (
      <CardsCarousel
        type="Loading"
        height={{ flex: 8 }}
        carouselItems={subtopic ? [""] : ["", "", ""]}
        subtopic={subtopic}
      />
    );
  } else if (tableStatus == "Not Found") {
    return (
      <View
        style={{
          flex: 8,
          padding: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "gray",
            ...Typography.light,
            fontWeight: "bold",
          }}
        >
          Try searching for any verb. If you can't find what
          you're looking for, please contact us.
        </Text>
      </View>
    );
  } else if (tableStatus == "Found") {
    return (
      <CardsCarousel
        type="Conjugations"
        height={{ flex: 8 }}
        carouselItems={
          subtopic
            ? [tableData.family.find((obj) => obj.tense.en == subtopic)]
            : tableData.family
        }
        pattern={tableData.pattern}
        infinitive={tableData.infinitive}
        root={tableData.root}
        translatedInfinitive={translatedInfinitive}
        subtopic={subtopic}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
      />
    );
  }
};

export default StudySection;
