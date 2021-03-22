export const initialRegistrationState = {
  email: "",
  password: "",
  confirm_password: "",
  first_name: "",
};

export const registrationReducer = (prevState, action) => {
    if(action.type == 'email'){
        return { ...prevState, email: action.payload }
    }else if(action.type == 'password'){
        return { ...prevState, password: action.payload }
    }else if(action.type == 'confirm_password'){
        return { ...prevState, confirm_password: action.payload }
    }else if(action.type == 'first_name'){
        return { ...prevState, first_name: action.payload }
    }
}

/* switch (field) {
      case "email":
        setState({ ...state, email: text });
        break;
      case "password":
        setState({ ...state, password: text });
        break;
      case "confirm_password":
        setState({ ...state, confirm_password: text });
        break;
      case "first_name":
        setState({ ...state, first_name: text });
        break;
      default:
        console.log("no change handled");
        break;
    } */