export const authenticationReducer = (prevState, action) => {
    switch( action.type ) {
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userEmail: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case 'SKIPLOGIN' : 
        return {
          ...prevState,
          skipSignin: true
        };
      case 'NO_USER_FOUND' : 
        return {
          ...prevState,
          noUserFound: true
        };
      case 'BACK2SPLASH' : 
        return {
          ...prevState,
          skipSignin: false
        }
    }
  };

  export const initialAuthState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
    skipSignin: false,
    noUserFound: false
  };