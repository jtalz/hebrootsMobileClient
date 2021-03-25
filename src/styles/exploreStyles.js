import { StyleSheet } from "react-native";
import { txtMagenta } from "./colors";
import { alignCenter, justifyAround } from "./spacing";
import { light, size12, taCenter } from "./typography";

const exploreStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      searchArea: {
        flex: 0.8,
        marginVertical: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
      },
      btnArea: {
        flex: 1,
        marginBottom: -10,
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-around",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      textSmall: {
        ...light,
        ...size12,
        ...txtMagenta,
        ...taCenter,
        marginVertical: 5,
      },
      title: {
        ...justifyAround,
        ...alignCenter,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10
      },
})

export default exploreStyles;