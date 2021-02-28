import getCharCodes from "../GetMethods/GetCharCodes";
import React from 'react';
import {Text} from 'react-native'
import {
    isSecondToLastConsonant,
    isFirstConsonant,
    isFirstHey,
    isFirstTuffDeep,
    isConsonant,
    checkInflectionRule
  } from "../InflectionRules_Hebrew";
import { normalize } from "../Normalize";
import { Typography } from "../../styles";

class VerbRoot{
    constructor(base_form, rootConditions){
      this.base_form = base_form;
      this.rootConditions = rootConditions;
      this.base_formCharCodes = getCharCodes(base_form)
    }
    getRootFormat = function(){
      const rootLetters = this.base_form.split("").filter((letter, position) => {
        return this.rootConditions.every(checkInflectionRule(letter.charCodeAt(0), position, this.base_formCharCodes))
      }).join(".")
      return <Text style={{ ...Typography.size16, ...Typography.regular }}>{rootLetters}</Text>
    }
}

export class PaalRoot extends VerbRoot{
    constructor(base_form){
      super(base_form, [isConsonant])
    }
  }
  
  export class NifalRoot extends VerbRoot{
    constructor(base_form){
      super(base_form, [isConsonant, (a,b,c)=>!isFirstConsonant(a,b,c)])
    }
  }
  
  export class PielRoot extends VerbRoot{
    constructor(base_form){
      super(base_form, [isConsonant])
    }
  }
  
  export class HitpaelRoot extends VerbRoot{
    constructor(base_form){
      super(base_form, [isConsonant, (a,b,c)=> !isFirstHey(a,b,c), (a,b,c)=>!isFirstTuffDeep(a,b,c)])
    }
  }
  
  export class HefilRoot extends VerbRoot{
    constructor(base_form){
      super(base_form, [isConsonant,  (a,b,c)=> !isFirstHey(a,b,c), (a,b,c)=>!isSecondToLastConsonant(a,b,c)])
    }
  }