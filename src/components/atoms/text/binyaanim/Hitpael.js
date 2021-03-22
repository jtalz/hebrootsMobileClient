import rules from "../../../../constants/INFLECTION_RULES_GROUPS";
import groupRulesByTense from "./groupRulesByTense";
import VerbInflector from "../VerbInflector";
const HITPAEL_RULE_GROUPS = groupRulesByTense(
    [rules._1, rules._2, rules._3, rules._30],
    [rules._10, rules._11, rules._12, rules._30],
    [rules._13, rules._14, rules._30]
)

class HitpaelInflection extends VerbInflector {
    constructor(verb) {
      super(verb, HITPAEL_RULE_GROUPS);
    }
}

export default HitpaelInflection;