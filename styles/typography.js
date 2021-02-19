import { normalize } from "../Actions/Normalize";

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
    fontSize: normalize(18)
}

export const largeEnLight = {
    ...enLight,
    ...large
}
