import rules from "../../../../constants/INFLECTION_RULES_GROUPS";
import groupRulesByTense from "./groupRulesByTense";
import VerbInflector from "../VerbInflector";

class PaalInflection extends VerbInflector {
  constructor(verb) {
    super(verb, PAAL_RULE_GROUPS);
  }
}

const PAAL_RULE_GROUPS = groupRulesByTense(
    [rules._20, rules._21, rules._22],
    [rules._7, rules._8, rules._9],
    [rules._17, rules._18]
)

export default PaalInflection