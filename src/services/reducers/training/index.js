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
