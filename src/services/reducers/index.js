export { authenticationReducer, initialAuthState } from "./authentication";
export {
  conjugationTableReducer,
  setNewExampleVerb,
  setNewSearchedVerb,
  setActiveIndex,
  getTenseFromActiveIndex,
  handleResponse,
  conjugationTableInitialState,
} from "./conjugationTable";
export { default as DragDropQReducer } from "./dragDrop";
export { default as matchingReducer } from './matching'
export { default as multiChoicesReducer } from './multipleChoice'
export { trainingReducer } from './training'
export { isCorrectConsonants, writingQReducer } from './writing'
export { initialRegistrationState, registrationReducer } from './registration'
