import { StyleSheet } from "react-native";

const exploreStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      searchArea: {
        flex: 0.8,
        marginTop: 20,
        marginBottom: 10,
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
})

export default exploreStyles;