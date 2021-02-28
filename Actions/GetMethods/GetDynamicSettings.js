import { requestUserSettings } from "../APIRequests";
import check_for_token from "../Authentication/check_for_token";

const getDynamicSettings = async (signOut, signInAgain) => {
    //check if user is logged in then return appropriate settings
    const token = await check_for_token();
    if (token !== undefined) {
      const customUserSettings = await requestUserSettings(token, signOut);
      return customUserSettings;
    } else {
      return {
        firstName: "",
        email: "",
        options: {
          name: "My Account",
          items: [
            {
              name: "Sign in/Register",
              type: "pressable",
              onPress: signInAgain,
            },
          ],
        },
      };
    }
  };

  export default getDynamicSettings;