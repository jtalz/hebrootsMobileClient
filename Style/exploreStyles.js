import { StyleSheet } from "react-native";

const exploreStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      searchArea: {
        width: "100%",
        flex: 0.8,
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "center",
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
})

export default exploreStyles;