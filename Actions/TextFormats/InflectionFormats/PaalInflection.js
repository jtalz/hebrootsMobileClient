import {rules} from '../../../Constants/INFLECTION_RULES_GROUPS'
import VerbInflection from './VerbInflection'
import groupRulesByTense from '../../GroupRulesByTense'

export class PaalInflection extends VerbInflection {
  constructor(verb) {
    super(verb, PAAL_RULE_GROUPS);
  }
}

const PAAL_RULE_GROUPS = groupRulesByTense(
    [rules._20, rules._21, rules._22],
    [rules._7, rules._8, rules._9],
    [rules._17, rules._18]
)