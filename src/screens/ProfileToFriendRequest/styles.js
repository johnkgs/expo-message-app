import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  friendContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  userImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  userImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  halfContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeHalfContainer: {
    width: "47%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 5,
    borderWidth: 1,
    height: 48,
    borderRadius: 4,
    marginVertical: 5,
    marginHorizontal: 5,
    marginTop: 20,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textTransform: "capitalize",
  },
  addButton: {
    width: 200,
    borderRadius: 4,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
  },
  addButtonText: {
    color: "#fff",
    marginRight: 5,
    fontSize: 20,
  },
  alreadyFriendsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  alreadyFriendsTextContainer: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
