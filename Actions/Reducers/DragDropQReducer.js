const DragDropQReducer = (state, {type, payload}) => {
    if (type == 'selectChoice'){
        return { ...state, selectedChoice : payload, checkEnabled: true }
    }else if (type == 'checkPlease'){
        return state.allChoices[state.selectedChoice] == state.verb ? 
                    {...state, questionStatus : 'correct', choicesEnabled : false } : 
                    {...state, questionStatus : 'incorrect', choicesEnabled : false } 
    }else if (type == 'disableCheck'){
        return {...state, checkEnabled: false}
    }
}

export default DragDropQReducer;