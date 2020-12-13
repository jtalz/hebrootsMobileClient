import {rules} from '../../../Constants/INFLECTION_RULES_GROUPS'
import VerbInflection from './VerbInflection'
import groupRulesByTense from '../../GroupRulesByTense'
const HEFIL_RULE_GROUPS = groupRulesByTense(
    [rules._1, rules._2, rules._3, rules._26, rules._27],
    [rules._10, rules._11, rules._12, rules._23, rules._24, rules._25],
    [rules._13, rules._14, rules._28, rules._29]
)

export class HefilInflection extends VerbInflection {
    constructor(verb) {
      super(verb, HEFIL_RULE_GROUPS);
    }
}