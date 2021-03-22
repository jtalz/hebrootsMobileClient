import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../styles";

const formStyles = StyleSheet.create({
  title: {
    ...Typography.size14,
    ...Colors.txtWhite,
    ...Typography.taCenter,
    ...Spacing.p5,
  },
  bottom: {
    marginVertical: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    alignSelf: "center",
    paddingTop: 10,
    color: "white",
    ...Typography.size12,
    ...Typography.light,
  },
  errorText: {
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    color: "red",
    ...Typography.semibold,
  },
  important: {
    alignSelf: "center",
    paddingTop: 10,
    ...Typography.size12,
    color: Colors.hebrootsBlue,
    ...Typography.semibold,
  },
  row: {
    ...Spacing.row,
    justifyContent: "center",
  },
});

export default formStyles;
