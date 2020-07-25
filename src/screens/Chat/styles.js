import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -20,
  },
  userImageContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },
  userImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 20,
    marginLeft: 10,
  },
  messageContainer: {
    flexDirection: "row",
    maxWidth: "80%",
    borderRadius: 5,
    marginBottom: 10,
  },
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    padding: 6,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    lineHeight: 18,
    fontSize: 16,
    maxHeight: 100,
  },
  flatListContainer: {
    paddingTop: 5,
    paddingHorizontal: 5,
  },
});
