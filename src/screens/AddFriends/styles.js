import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 5,
    borderWidth: 1,
    height: 48,
    borderRadius: 4,
    marginTop: 20,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderRadius: 4,
  },
  userImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  userImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  nameContainer: {
    maxWidth: width - 100,
    width: 0,
    flexGrow: 1,
    flex: 1,
    marginLeft: 10,
  },
  nameTextContainer: {
    fontSize: 20,
    textTransform: "capitalize",
  },
});
