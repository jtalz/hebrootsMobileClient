export const conjugationTableReducer = (state, action) => {
    if (action.type == "loadTableData"){
      console.log('loading table data this is crazy')
      return {...state, tableStatus: 'Loading'}
    }else if (action.type == "setInvalidResponse"){
      return {...state, tableStatus: 'Not Found'}
    }else if (action.type == "setTableData"){
      console.log('setting table data for: ', action.payload.infinitive)
      return {...state, tableStatus: 'Found', 
      tableData: {
        family: action.payload.family,
        infinitive: action.payload.infinitive,
        pattern: action.payload.pattern,
        root: action.payload.root,
        noun_phrase: action.payload.noun_phrase  
      }} 
    }else if(action.type == 'setActiveIndex'){
      return { ...state, activeIndex: action.payload}
    }else{
      console.log('some other dispatch recieved')
    }
  }

  export const handleResponse = (response, dispatch) => {
    response == "InvalidResponse"
        ? dispatch({ type: "setInvalidResponse" })
        : dispatch({
            type: "setTableData",
            payload: {
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