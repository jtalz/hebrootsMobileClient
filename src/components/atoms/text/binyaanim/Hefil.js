import rules from "../../../../constants/INFLECTION_RULES_GROUPS";
import groupRulesByTense from "./groupRulesByTense";
import VerbInflector from "../VerbInflector";

const HEFIL_RULE_GROUPS = groupRulesByTense(
    [rules._1, rules._2, rules._3, rules._26, rules._27],
    [rules._10, rules._11, rules._12, rules._23, rules._24, rules._25],
    [rules._13, rules._14, rules._28, rules._29]
)

class HefilInflection extends VerbInflector {
    constructor(verb) {
      super(verb, HEFIL_RULE_GROUPS);
    }
}

export default HefilInflection;