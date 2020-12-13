import getCharCodes from "../GetMethods/GetCharCodes";
import { rules } from "./Subgroups";
import React from "react";
import { Text } from "react-native";
import BlueLetter from '../../Components/BlueLetter'
import GreenLetter from '../../Components/GreenLetter'
import { checkInflectionRule } from '../InflectionRules_Hebrew'

const getConjugationRule = (verb, ruleGroups) => {
  const applicableConditionGroup = ruleGroups[verb.tense]
  const applicableSubGroups = applicableConditionGroup.filter(
    (group) => group.morphologies.indexOf(verb.morphology) !== -1
  );
  return applicableSubGroups;
};

class PatternConjugation {
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
            <GreenLetter key={position} fontSize={this.fontSize} sign={this.conjugation[position]} />
          ) : (
            <BlueLetter key={position} fontSize={this.fontSize} sign={this.conjugation[position]} />
          );
        })}
      </Text>
    );
    return formattedText;
  };
}

const generateRuleGroups = (past, present, future) => {
    return {
      PAST: past,
      PRESENT: present,
      FUTURE: future,
      INFINITIVE: [rules._19]
    };
  }

const PAAL_RULE_GROUPS = generateRuleGroups(
    [rules._20, rules._21, rules._22],
    [rules._7, rules._8, rules._9],
    [rules._17, rules._18]
)

export class PaalVerb extends PatternConjugation {
  constructor(verb) {
    super(verb, PAAL_RULE_GROUPS);
  }
}

const NIFAL_RULE_GROUPS = generateRuleGroups(
    [rules._1, rules._2, rules._3],
    [rules._10, rules._11, rules._12],
    [rules._15, rules._16]
)

export class NifalVerb extends PatternConjugation {
  constructor(verb) {
    super(verb, NIFAL_RULE_GROUPS);
  }
}

const PIEL_RULE_GROUPS = generateRuleGroups(
    [rules._4, rules._5, rules._6],
    [rules._10, rules._11, rules._12],
    [rules._13, rules._14]
)

export class PielVerb extends PatternConjugation {
  constructor(verb) {
    super(verb, PIEL_RULE_GROUPS);
  }
}

const HITPAEL_RULE_GROUPS = generateRuleGroups(
    [rules._1, rules._2, rules._3, rules._30],
    [rules._10, rules._11, rules._12, rules._30],
    [rules._13, rules._14, rules._30]
)

export class HitpaelVerb extends PatternConjugation {
    constructor(verb) {
      super(verb, HITPAEL_RULE_GROUPS);
    }
}

const HEFIL_RULE_GROUPS = generateRuleGroups(
    [rules._1, rules._2, rules._3, rules._26, rules._27],
    [rules._10, rules._11, rules._12, rules._23, rules._24, rules._25],
    [rules._13, rules._14, rules._28, rules._29]
)

export class HefilVerb extends PatternConjugation {
    constructor(verb) {
      super(verb, HEFIL_RULE_GROUPS);
    }
}