const multiChoicesReducer = (prevState, action) => {
    if (action.type == "setCoordinates") {
      return { ...prevState, layout: action.payload };
    } else if (action.type == "prepareForLanding") {
      return { ...prevState, isFull: true, occupier: action.payload };
    } else if (action.type == "clearOut") {
      return { ...prevState, isFull: false, occupier: null };
    }
  };

  export default multiChoicesReducer