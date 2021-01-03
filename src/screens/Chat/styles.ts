import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -20
  },
  userImageContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0'
  },
  userImage: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleContainer: {
    maxWidth: width - 160,
    width: 0,
    flexGrow: 1,
    flex: 1,
    marginLeft: 10
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 20
  },
  messageContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    borderRadius: 5,
    marginBottom: 10
  },
  sendMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 6,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2
  },
  input: {
    flex: 1,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 24,
    lineHeight: 18,
    fontSize: 16,
    maxHeight: 100,
    borderWidth: 1,
    elevation: 5
  },
  flatListContainer: {
    paddingTop: 5,
    paddingHorizontal: 5
  }
});
