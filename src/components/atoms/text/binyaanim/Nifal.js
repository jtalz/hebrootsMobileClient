import rules from "../../../../constants/INFLECTION_RULES_GROUPS";
import groupRulesByTense from "./groupRulesByTense";
import VerbInflector from "../VerbInflector";

const NIFAL_RULE_GROUPS = groupRulesByTense(
    [rules._1, rules._2, rules._3],
    [rules._10, rules._11, rules._12],
    [rules._15, rules._16]
)

class NifalInflection extends VerbInflector {
  constructor(verb) {
    super(verb, NIFAL_RULE_GROUPS);
  }
}

export default NifalInflection;