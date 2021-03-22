import { compose } from "../../utils";

const attemptToMatch = (card, deck) => { return compose( updateDeckAfterSubmission, checkForMatch, selectCard )({card, deck}) }

const checkForMatch = (deck) => {
    //returns true or false based on 2 selected cards 
    var selectedCards = deck.filter((c, i) => c.selected);
    if(selectedCards.length == 2){
        return {submission: selectedCards[0].pair == selectedCards[1].pair, deck}
    }else{
        return {submission: false, deck}
    }
}

const updateDeckAfterSubmission = (verdict) => {
    //returns new array - if selected card are correct then they become invisible, if not then they become unselected
    return verdict.submission ? 
        verdict.deck.map((c, i)=> { return c.selected ? { ...c, selected: false, visible: false, justSubmitted: true } : {...c, justSubmitted: false} })
        :
        verdict.deck.map((c, i)=> { return c.selected ? {...c, selected: false, justSubmitted: true } : {...c, justSubmitted: false} })
}

const selectCard = ({card, deck}) => {
    //sets selected card.selected = true and returns array of updated cards
    return deck.map((c, i)=>{
        return c._id == card._id ? {...c, selected: true, justSubmitted: false} : {...c, justSubmitted: false};
    });
    //return newAllCards;
}

const unselectCard = ({card, deck}) => {
    return deck.map((c, i) => {
        return c._id == card._id ? {...c, selected: false, justSubmitted: false} : {...c, justSubmitted: false}
    })
}

const matchingReducer = (state, action) => {
    if (action.type == 'selectCard'){
        var isUserPickingSecondCard = state.deck.filter((c, i) => c.selected).length > 0;
        var isUserPickingSameCard = state.deck.find(c => c.selected) == action.payload
        var isGameFinished = state.deck.filter(c => c.visible).length <= 2;
        return isUserPickingSecondCard ? 
            isUserPickingSameCard ? 
            {...state, deck: unselectCard({card: action.payload, deck: state.deck})}
            :
            { ...state, deck : attemptToMatch(action.payload, state.deck), continueEnabled: isGameFinished,modalVisibility:  {...state.modalVisibility, passed: isGameFinished}, timer: { ...state.timer, start: !isGameFinished }}
            //setAllCards(compose( updateDeckAfterSubmission, checkForMatch, selectCard )({card, allCards}))
            :
            { ...state, deck : selectCard({card: action.payload, deck: state.deck}) }
            //setAllCards(selectCard({card, allCards}))
    }else if (action.type == 'exit'){
        return {...state, modalVisibility: { ...state.modalVisibility, exit: true }, timer: {...state.timer, start: false}}
    }else if (action.type == 'close'){
        return {...state, modalVisibility: { exit: false, passed: false, instructions: false }, timer: {...state.timer, start: true} }
    }else if (action.type == 'startTimer'){
        return {...state, timer: { ...state.timer, start: true }}
    }else if (action.type == 'next'){
        return {
          ...state, 
          continueEnabled: false
        }
      }
}

export default matchingReducer