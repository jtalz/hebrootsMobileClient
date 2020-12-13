import {rules} from '../../../Constants/INFLECTION_RULES_GROUPS'
import VerbInflection from './VerbInflection'
import groupRulesByTense from '../../GroupRulesByTense'
const HITPAEL_RULE_GROUPS = groupRulesByTense(
    [rules._1, rules._2, rules._3, rules._30],
    [rules._10, rules._11, rules._12, rules._30],
    [rules._13, rules._14, rules._30]
)

export class HitpaelInflection extends VerbInflection {
    constructor(verb) {
      super(verb, HITPAEL_RULE_GROUPS);
    }
}