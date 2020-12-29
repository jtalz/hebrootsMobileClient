import React from 'react';

const AuthContext = React.createContext()

/* export const authContext = useMemo(
    () => ({
      login: async (data) => {
        const { token } = await login(data);
        storeAndProceedWithToken(token, dispatch);
      },
      signOut: () => dispatch({ type: "LOGOUT" }),
      register: async (data) => {
        const { token } = await register(data);
        storeAndProceedWithToken(token, dispatch);
      },
    }),
    []
  ); */

  export default AuthContext;
