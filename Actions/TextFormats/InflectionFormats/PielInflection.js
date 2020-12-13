import {rules} from '../../../Constants/INFLECTION_RULES_GROUPS'
import VerbInflection from './VerbInflection'
import groupRulesByTense from '../../GroupRulesByTense'
const PIEL_RULE_GROUPS = groupRulesByTense(
    [rules._4, rules._5, rules._6],
    [rules._10, rules._11, rules._12],
    [rules._13, rules._14]
)

export class PielInflection extends VerbInflection {
  constructor(verb) {
    super(verb, PIEL_RULE_GROUPS);
  }
}