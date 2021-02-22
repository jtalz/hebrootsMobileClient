import isCorrectConsonants from "../CheckAnswer";

const WritingQReducer = (state, action) => {
    if (action.type == "handleTextInput") {
      return isCorrectConsonants(action.payload, state.verb)
        ? {
            ...state,
            inputEnabled: false,
            inputValue: state.verb,
            questionStatus: "correct",
            continueEnabled: true,
          }
        : {
            ...state,
            inputValue: action.payload,
          };
    } else if (action.type == "giveUp") {
      return {
        ...state,
        inputEnabled: false,
        questionStatus: "gaveUp",
        inputValue: state.verb,
        continueEnabled: true,
      };
    }else if (action.type == 'next'){
      return {
        ...state, 
        continueEnabled: false,
        questionStatus: 'unanswered'
      }
    }
  };

  export default WritingQReducer;