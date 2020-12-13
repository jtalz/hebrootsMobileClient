import {rules} from '../../../Constants/INFLECTION_RULES_GROUPS'
import VerbInflection from './VerbInflection'
import groupRulesByTense from '../../GroupRulesByTense'

const NIFAL_RULE_GROUPS = groupRulesByTense(
    [rules._1, rules._2, rules._3],
    [rules._10, rules._11, rules._12],
    [rules._15, rules._16]
)

export class NifalInflection extends VerbInflection {
  constructor(verb) {
    super(verb, NIFAL_RULE_GROUPS);
  }
}