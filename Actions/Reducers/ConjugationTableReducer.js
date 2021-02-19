import { requestRandomVerbOfPattern, requestVerbFromValue } from "../APIRequests"

export const conjugationTableReducer = (state, action) => {
    if (action.type == "loadTableData"){
      return {...state, tableStatus: 'Loading'}
    }else if (action.type == "setInvalidResponse"){
      return {...state, tableStatus: 'Not Found'}
    }else if (action.type == "setTableData"){
      return {...state, tableStatus: 'Found', 
      tableData: {
        family: action.payload.family,
        infinitive: action.payload.infinitive,
        pattern: action.payload.pattern,
        root: action.payload.root,
        noun_phrase: action.payload.noun_phrase,
        translation: action.payload.translation 
      }} 
    }else if(action.type == 'setActiveIndex'){
      return { ...state, activeIndex: action.payload}
    }else{
      console.log('some other dispatch recieved')
    }
  }

  export const setNewExampleVerb = (pattern_id, dispatch) => {
    requestRandomVerbOfPattern(pattern_id)
      .then(randomVerb=> handleResponse(randomVerb, dispatch));
  };

  export const setNewSearchedVerb = (dispatch) => (text) => {
    dispatch({ type: "loadTableData" });
    requestVerbFromValue(text)
      .then(searchedVerb => handleResponse(searchedVerb, dispatch))
  };

  export const setActiveIndex = (dispatch) => (payload) => dispatch({ type: "setActiveIndex", payload });

  export const getTenseFromActiveIndex = (activeIndex) => {
    switch (activeIndex) {
      case 0:
        return "PAST";
        break;
      case 1:
        return "PRESENT";
        break;
      case 2:
        return "FUTURE";
        break;
    }
  };

  export const handleResponse = (response, dispatch) => {
    response == "InvalidResponse"
        ? setInvalidResponse(dispatch)
        : setTableData(response, dispatch);
  }

  const setInvalidResponse = (dispatch) => {
    dispatch({ type: "setInvalidResponse" })
  }

  const setTableData = (response, dispatch) => {
    dispatch({
      type: "setTableData",
      payload: {
        translation: response.translation,
        pattern: response.pattern,
        infinitive: response.infinitive,
        family: response.organizedFamily,
        root: response.root,
        noun_phrase: response.noun_phrase !== undefined ? response.noun_phrase : null
      },
    });
  }
  
  export const initialState = {
    tableStatus : 'Loading',
    tableData : {
      family: [],
      infinitive: '',
      pattern: '',
      root: ''
    },
    activeIndex: 0
  }