import React, { useReducer } from "react";
import { View } from "react-native";
import { State } from "react-native-gesture-handler";
import { Draggable } from "../../atoms";
import { getHebrewConsonantCodes, multiChoicesReducer, timedAnimation } from "../../../services";
import SentenceWithVerb from "./SentenceWithVerb";
import { Sizing } from '../../../styles'

const MultipleChoices = ({
  choices,
  setSelected,
  style,
  possession,
  tense,
  verb,
  answered,
  morphology,
  tense_en,
  pattern,
  noun_phrase,
  gameStyle,
  pronoun_en,
  enabled,
}) => {

  const [landingZone, dispatch] = useReducer(multiChoicesReducer, {
    layout: { x: 0, y: 0 },
    occupier: null,
    isFull: false,
  });

  const setCoordinates = (coordinates) =>
    dispatch({ type: "setCoordinates", payload: coordinates });

  const prepareForLanding = (occupier) =>
    dispatch({ type: "prepareForLanding", payload: occupier });

  const clearOut = () => dispatch({ type: "clearOut" });

  const returnHandlerHome = (_translate, index) => {
    timedAnimation(_translate, 200, { x: 0, y: 0 }).start(() => {
      _translate.setOffset({ x: 0, y: 0 });
      _translate.setValue({ x: 0, y: 0 });
      if (landingZone.occupier == index) {
        clearOut();
        setSelected(null);
      }
    });
  };

  const sendHandlerToPlace = (_layout, _translate, index) => {
    timedAnimation(_translate, 200, {
      x:
        landingZone.layout.x -
        _layout.x +
        Sizing.normalize(getHebrewConsonantCodes(verb).length),
      y: landingZone.layout.y - _layout.y + Sizing.normalize(10),
    }).start(() => {
      _translate.setOffset({
        x:
          landingZone.layout.x -
          _layout.x +
          Sizing.normalize(getHebrewConsonantCodes(verb).length),
        y: landingZone.layout.y - _layout.y + Sizing.normalize(10),
      });
      _translate.setValue({ x: 0, y: 0 });
      prepareForLanding(index)
      setSelected(index);
    });
  };

  const onHandlerStateChange = (_layout, _translate, index) => (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _translate.flattenOffset();
      landingZone.isFull
        ? returnHandlerHome(_translate, index)
        : sendHandlerToPlace(_layout, _translate, index);
    }
  };

  return (
    <View style={{ ...style }}>
      <SentenceWithVerb
        gameStyle={gameStyle}
        possession={possession}
        tense={tense}
        verb={verb}
        answered={answered}
        morphology={morphology}
        tense_en={tense_en}
        pattern={pattern}
        noun_phrase={noun_phrase}
        pronoun_en={pronoun_en}
        setLandingZoneCoordinates={setCoordinates}
      />
      {choices.map((name, index) => (
        <Draggable
          key={index}
          name={name}
          onHandlerStateChange={onHandlerStateChange}
          index={index}
          landingZone={landingZone}
          clearOut={clearOut}
          setSelected={setSelected}
          choices={choices}
          enabled={enabled}
        />
      ))}
    </View>
  );
};

export default MultipleChoices;
