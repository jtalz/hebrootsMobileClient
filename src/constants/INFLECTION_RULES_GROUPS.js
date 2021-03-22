import {
    isVowel,
    isLastConsonant,
    isLamedAndFirstConsonant,
    isYudAndSecondConsonant,
    isVuvAndSecondConsonant,
    isVuvAndSecondToLastConsonant,
    isYudAndSecondToLastConsonant,
    isYudAndThirdToLastConsonant,
    isYudAndFourthToLastConsonant,
    isFirstConsonant,
    isSecondConsonant,
    isSecondToLastConsonant,
    isFirstTuffDeep,
    isLetterConsonant
  } from "./InflectionRules_Hebrew";
  
  const morphologyGroup1 = [
    "FIRST+MF+SINGULAR",
    "FIRST+MF+PLURAL",
    "SECOND+M+PLURAL",
    "SECOND+F+PLURAL",
  ];
  
  const morphologyGroup2 = [
    "SECOND+M+SINGULAR",
    "SECOND+F+SINGULAR",
    "THIRD+F+SINGULAR",
    "THIRD+M+PLURAL",
    "THIRD+F+PLURAL",
  ];
  
  const THIRD_M_SINGULAR = ["THIRD+M+SINGULAR"];
  
  const morphologyGroup4 = [
    "FIRST+MF+SINGULAR",
    "FIRST+MF+PLURAL",
    "SECOND+M+SINGULAR",
    "THIRD+M+SINGULAR",
    "THIRD+F+SINGULAR",
  ];
  
  const morphologyGroup5 = [
    "THIRD+M+PLURAL",
    "THIRD+F+PLURAL",
    "SECOND+M+PLURAL",
    "SECOND+F+PLURAL",
    "SECOND+F+SINGULAR",
  ];
  
  const MALE_SINGULAR_FORMS = [
    "FIRST+M+SINGULAR",
    "THIRD+M+SINGULAR",
    "SECOND+M+SINGULAR",
  ];
  
  const FEMALE_SINGULAR_FORMS = [
    "FIRST+F+SINGULAR",
    "THIRD+F+SINGULAR",
    "SECOND+F+SINGULAR",
  ];
  
  const BINARY_PLURAL_FORMS = [
    "THIRD+M+PLURAL",
    "FIRST+M+PLURAL",
    "FIRST+F+PLURAL",
    "THIRD+F+PLURAL",
    "SECOND+M+PLURAL",
    "SECOND+F+PLURAL",
  ];
  
  const INFINITIVE_FORM = [
      "INFINITIVE"
  ]
  
  const ALL_PLURAL_FORMS = [
      'FIRST+MF+PLURAL',
      'FIRST+M+PLURAL',
      'FIRST+F+PLURAL',
      'THIRD+M+PLURAL',
      'THIRD+F+PLURAL',
      'SECOND+M+PLURAL',
      'SECOND+F+PLURAL'
  ]
  
  const morphologyGroup6 = [
    "THIRD+F+SINGULAR",
    "THIRD+M+PLURAL",
    "THIRD+F+PLURAL",
  ]
  
  const ALL_FORMS = [
    'FIRST+MF+SINGULAR', 
      'FIRST+M+SINGULAR', 
      'FIRST+F+SINGULAR', 
      'SECOND+M+SINGULAR', 
      'SECOND+F+SINGULAR',
      'THIRD+M+SINGULAR',
      'THIRD+F+SINGULAR',
      'FIRST+MF+PLURAL',
      'FIRST+M+PLURAL',
      'FIRST+F+PLURAL',
      'THIRD+M+PLURAL',
      'THIRD+F+PLURAL',
      'SECOND+M+PLURAL',
      'SECOND+F+PLURAL'
  ]
  
const rules = {
      //infinitive rule
      _19: {
          morphologies: INFINITIVE_FORM,
          conditions: [isVowel, isLamedAndFirstConsonant]
      },
      _20: {
        morphologies: morphologyGroup1,
        conditions: [isVowel, isLastConsonant, isSecondToLastConsonant],
      }, 
      _21: {
        morphologies: morphologyGroup2,
        conditions: [isVowel, isLastConsonant],
      }, 
      _22 : {
        morphologies: THIRD_M_SINGULAR,
        conditions: [isVowel],
      },
      _23 : {
        morphologies: MALE_SINGULAR_FORMS,
        conditions: [isYudAndSecondToLastConsonant]
      },
      _24 : {
        morphologies: FEMALE_SINGULAR_FORMS,
        conditions: [isYudAndThirdToLastConsonant]
      },
      _25 : {
        morphologies: ALL_PLURAL_FORMS,
        conditions: [isYudAndFourthToLastConsonant]
      },
      _26 : {
        morphologies: morphologyGroup6,
        conditions: [isYudAndThirdToLastConsonant]
      },
      _27 : {
        morphologies: THIRD_M_SINGULAR,
        conditions: [isYudAndSecondToLastConsonant]
      },
      _28 : {
        morphologies: morphologyGroup4,
        conditions: [isYudAndSecondToLastConsonant]
      },
      _29 : {
        morphologies: morphologyGroup5,
        conditions: [isYudAndThirdToLastConsonant]
      },
      _30 : {
        morphologies: ALL_FORMS,
        conditions: [isFirstTuffDeep]
      },
    //getRegularPastTextFormatOf
    _1: {
      morphologies: morphologyGroup1,
      conditions: [isVowel, isLastConsonant, isSecondToLastConsonant, isFirstConsonant],
    },
    _2: {
      morphologies: morphologyGroup2,
      conditions: [isVowel, isLastConsonant, isFirstConsonant],
    },
    _3: {
      morphologies: THIRD_M_SINGULAR,
      conditions: [isVowel, isFirstConsonant],
    },
    //getIrregularPastTextFormatOf
    _4: {
      morphologies: morphologyGroup1,
      conditions: [isVowel, isLastConsonant, isSecondToLastConsonant, isYudAndSecondConsonant],
    },
    _5: {
      morphologies: morphologyGroup2,
      conditions: [isVowel, isLastConsonant, isYudAndSecondConsonant],
    },
    _6: {
      morphologies: THIRD_M_SINGULAR,
      conditions: [isVowel, isYudAndSecondConsonant],
    },
    //getIrregularPresentTextFormatOf
    _7: {
      morphologies: MALE_SINGULAR_FORMS,
      conditions: [isVowel, isVuvAndSecondConsonant],
    },
    _8: {
      morphologies: FEMALE_SINGULAR_FORMS,
      conditions: [isVowel, isLastConsonant, isVuvAndSecondConsonant],
    },
    _9: {
      morphologies: BINARY_PLURAL_FORMS,
      conditions: [isVowel, isLastConsonant, isSecondToLastConsonant, isVuvAndSecondConsonant],
    }, //getRegularPresentTextFormatOf
    _10: {
      morphologies: MALE_SINGULAR_FORMS,
      conditions: [isVowel, isFirstConsonant],
    },
    _11: {
      morphologies: FEMALE_SINGULAR_FORMS,
      conditions: [isVowel, isLastConsonant, isFirstConsonant],
    },
    _12: {
      morphologies: BINARY_PLURAL_FORMS,
      conditions: [isVowel, isLastConsonant, isSecondToLastConsonant, isFirstConsonant],
    },
    //getRegularFutureTextFormatOf
    _13: {
      morphologies: morphologyGroup4,
      conditions: [isVowel, isFirstConsonant],
    },
    _14: {
      morphologies: morphologyGroup5,
      conditions: [isVowel, isFirstConsonant, isLastConsonant],
    },
    //getIrregularFutureTextFormatOf
    _15: {
      morphologies: morphologyGroup4,
      conditions: [isVowel, isFirstConsonant, isSecondConsonant],
    },
    _16: {
      morphologies: morphologyGroup5,
      conditions: [isVowel, isFirstConsonant, isSecondConsonant, isLastConsonant],
    },
    //getIrregularFutureTextFormat2Of
    _17: {
      morphologies: morphologyGroup4,
      conditions: [isVowel, isFirstConsonant, isVuvAndSecondToLastConsonant],
    },
    _18: {
      morphologies: morphologyGroup5,
      conditions: [isVowel, isFirstConsonant, isLastConsonant],
    },
  };
  
  export default rules;