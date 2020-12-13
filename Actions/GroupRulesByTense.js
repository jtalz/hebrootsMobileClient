import {rules} from '../Constants/INFLECTION_RULES_GROUPS'

const groupRulesByTense = (past, present, future) => {
    return {
      PAST: past,
      PRESENT: present,
      FUTURE: future,
      INFINITIVE: [rules._19]
    };
  }

  export default groupRulesByTense;