import { normalize } from "./sizing";

const fontFamily = (fontFamily) => ({ fontFamily });

const textAlign = (dir) => ({ textAlign: dir });

export const taLeft = textAlign("left");

export const taCenter = textAlign("center");

export const taRight = textAlign("right");

export const regular = fontFamily("Poppins_400Regular");

export const semibold = fontFamily("Poppins_600SemiBold");

export const light = {
  fontFamily: "Poppins_300Light",
};

const fontSize = (fontSize) => ({ fontSize: normalize(fontSize) });

export const size18 = fontSize(18);

export const size12 = fontSize(12);

export const size10 = fontSize(10);

export const size14 = fontSize(14);

export const size16 = fontSize(16);

export const enLight = {
  fontFamily: "Nunito_300Light",
};

export const heLigh = {
  fontFamily: "Rubik_300Light",
};

export const textAlignCenter = {
  textAlign: "center",
};

export const large = {
  fontSize: normalize(18),
};

export const largeEnLight = {
  ...enLight,
  ...large,
};
