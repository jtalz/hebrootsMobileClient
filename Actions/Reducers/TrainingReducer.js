import DragDropQuestion from "../../Screens/Training/Exercises/ComboComponents/DragDropQuestion";
import MatchingQuestion from "../../Screens/Training/Exercises/ComboComponents/MatchingQuestion";
import WritingQuestion from "../../Screens/Training/Exercises/ComboComponents/WritingQuestion";
import getGameplayWords from "../GetMethods/GetGameplayWords";

const createComboTrainingDataset = ({ family }) => {
  //let typeCounter = 1;
  let typeCounter;
  const ctds = family.map((inflectionObj, index) => {
    typeCounter = Math.floor(Math.random() * 3);
    let question = {
      type: typeCounter,
      qComponent: getQComponent(typeCounter),
    };
    return question;
  });
  return ctds;
};

const getQComponent = (type) => {
  if (type == 0) {
    return DragDropQuestion;
  } else if (type == 1) {
    return WritingQuestion;
  } else if (type == 2) {
    return MatchingQuestion;
  }
};

export const getInitialTrainingState = ({ family }) => {
  const verbFamily = getGameplayWords(JSON.parse(JSON.stringify(family)));
  let trainingSet = createComboTrainingDataset({
    family: verbFamily,
  });
  return {
    verbFamily,
    allQComponents: trainingSet,
    progress: 0,
    lives: 3,
    slideValue: 0,
    progressIncrementer: 100 / verbFamily.length,
    modalVisibility: {
      exit: false,
      grade: false,
      failed: false,
      passed: false,
      instructions: true,
    },
  };
};

export const trainingReducer = (prevState, action) => {
  if (action.type == "updateProgress") {
    return action.payload
      ? {
          ...prevState,
          progress: prevState.progress + prevState.progressIncrementer,
        }
      : prevState.lives - 1 == 0
      ? {
          ...prevState,
          lives: prevState.lives - 1,
          modalVisibility: { ...prevState.modalVisibility, failed: true },
        }
      : {
          ...prevState,
          verbFamily: prevState.verbFamily.concat(
            prevState.verbFamily[prevState.slideValue]
          ),
          allQComponents: prevState.allQComponents.concat(
            prevState.allQComponents[prevState.slideValue]
          ),
          lives: prevState.lives - 1,
        };
  } else if (action.type == "nextSlide") {
    return prevState.slideValue == prevState.verbFamily.length - 1
      ? {
          ...prevState,
          modalVisibility: { ...prevState.modalVisibility, passed: true },
        }
      : { ...prevState, slideValue: prevState.slideValue + 1 };
  } else if (action.type == "exit") {
    return {
      ...prevState,
      modalVisibility: { ...prevState.modalVisibility, exit: true },
    };
  } else if (action.type == "closeModal") {
    return {
      ...prevState,
      modalVisibility: {
        exit: false,
        grade: false,
        failed: false,
        passed: false,
        instructions: false,
      },
    };
  }
};
