import {
    VarelaRound_400Regular,
    useFonts,
  } from "@expo-google-fonts/varela-round";
  import {
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_400Regular,
  } from "@expo-google-fonts/nunito";
  import {
    Rubik_300Light,
    Rubik_300Light_Italic,
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_500Medium,
  } from "@expo-google-fonts/rubik";

  const can_load_fonts = () => {
    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular,
        Rubik_300Light,
        Rubik_300Light_Italic,
        Rubik_400Regular,
        Rubik_400Regular_Italic,
        Nunito_300Light,
        Nunito_200ExtraLight,
        Nunito_200ExtraLight_Italic,
        Nunito_400Regular,
        Rubik_500Medium,
    });
    return !fontsLoaded ? true : false;
  }

  export default can_load_fonts;