import compose from '../Compose';
import getNRandomUniqueElements from '../GetMethods/GetNRandomUniqueElements'
import shuffleArray from '../ShuffleArray'
import getAllChoices from '../GetMethods/GetAllChoices'

const multiChoiceReducer = (state, {type, payload}) => {
    if (type == 'selectChoice'){
        return { ...state, selectedChoice : payload, checkEnabled: true }
    }else if (type == 'checkPlease'){
        return state.allChoices[state.selectedChoice] == state.activeVerb.conjugation ? 
                    {...state, progress : state.progress+ state.progressIncrementer, questionStatus : 'correct', choicesEnabled : false } : 
                state.lives - 1 == 0 ? 
                    {...state, verbData: state.verbData.concat(state.verbData[state.activeVerb.nActiveVerb]),questionStatus : 'incorrect', choicesEnabled : false, lives : state.lives-1, modalVisibility:{...state.modalVisibility, failed: true} } :
                    {...state, verbData: state.verbData.concat(state.verbData[state.activeVerb.nActiveVerb]),questionStatus : 'incorrect', choicesEnabled : false, lives : state.lives-1}
    }else if (type == 'disableCheck'){
        return {...state, checkEnabled: false}
    }else if (type == 'moveToNextQuestion'){
        return state.activeVerb.nActiveVerb == state.verbData.length-1 ? 
        {...state, modalVisibility:{...state.modalVisibility, passed: true}} :
        { ...state, 
            selectedChoice: null,
            questionStatus: 'unanswered',
            choicesEnabled: true,
            checkEnabled : false,
            activeVerb : {
                nActiveVerb : state.activeVerb.nActiveVerb+1,
                conjugation : state.verbData[state.activeVerb.nActiveVerb+1].conjugation
            }, 
            allChoices: compose(getAllChoices, shuffleArray, getNRandomUniqueElements)({caller:'reducer', usedElements: [state.verbData[state.activeVerb.nActiveVerb+1].conjugation], data: state.verbData, nCardsRequested: 3, type: 'conjugation'}), 
        }
    }else if (type == 'replay'){
        return {...payload}
    }else if (type == 'close'){
        return {...state, modalVisibility: {exit: false, grade: false, failed: false, passed: false, instructions: false}}
    }else if (type == 'exit' ){
        return {...state, modalVisibility: {...state.modalVisibility, exit: true}}
    }
}

export default multiChoiceReducer;