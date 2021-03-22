import React from "react";
import { Text } from "react-native";
import { checkInflectionRule } from "../../../constants";
import { getCharCodes } from "../../../services/utils";
import GreenText from "./Green";
import MagentaText from "./Magenta";

const getConjugationRule = (verb, ruleGroups) => {
  const applicableConditionGroup = ruleGroups[verb.tense]
  const applicableSubGroups = applicableConditionGroup.filter(
    (group) => group.morphologies.indexOf(verb.morphology) !== -1
  );
  return applicableSubGroups;
};

class VerbInflector {
  constructor(verb, ruleGroups) {
    this.conjugation = verb.conjugation;
    this.morphology = verb.morphology;
    this.tense = verb.tense;
    this.conjugation_Char_Codes = getCharCodes(verb.conjugation);
    this.conjugationRules = getConjugationRule(verb, ruleGroups);
    this.fontSize = verb.fontSize;
  }

  getFormattedText = () => {
    const formattedText = (
      <Text>
        {this.conjugation_Char_Codes.map((char_code, position) => {
          let isRoot = false; 
          this.conjugationRules.forEach(
            (rule) => {
              if (rule.conditions.some(checkInflectionRule(char_code, position,this.conjugation_Char_Codes))){
                isRoot = true;
              }
            }
          )
          
          return isRoot ? (
            <GreenText key={position} fontSize={this.fontSize} sign={this.conjugation[position]} />
          ) : (
            <MagentaText key={position} fontSize={this.fontSize} sign={this.conjugation[position]} />
          );
        })}
      </Text>
    );
    return formattedText;
  };
}

export default VerbInflector