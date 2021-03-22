import { requestUserSettings } from "../apiRequests";
import { check_for_token } from "../asyncStorage";

const getDynamicSettings = async (signOut, backToSplash) => {
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
              onPress: backToSplash,
            },
          ],
        },
      };
    }
  };

  export default getDynamicSettings;