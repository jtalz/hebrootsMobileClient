import rules from "../../../../constants/INFLECTION_RULES_GROUPS";
import groupRulesByTense from "./groupRulesByTense";
import VerbInflector from "../VerbInflector";
const PIEL_RULE_GROUPS = groupRulesByTense(
    [rules._4, rules._5, rules._6],
    [rules._10, rules._11, rules._12],
    [rules._13, rules._14]
)

class PielInflection extends VerbInflector {
  constructor(verb) {
    super(verb, PIEL_RULE_GROUPS);
  }
}

export default PielInflection;