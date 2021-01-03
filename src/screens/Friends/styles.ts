import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  userListContainer: {
    marginTop: 10,
    borderBottomWidth: 3,
    alignItems: 'center'
  },
  userListTextContainer: {
    fontSize: 26,
    marginVertical: 10,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    flex: 1
  },
  userImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0'
  },
  userImage: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  status: {
    position: 'absolute',
    top: 28,
    right: 0,
    padding: 4,
    height: 14,
    width: 14,
    borderRadius: 7,
    borderWidth: 2
  },
  nameContainer: {
    maxWidth: width - 100,
    width: 0,
    flexGrow: 1,
    flex: 1,
    marginLeft: 10
  },
  nameTextContainer: {
    fontSize: 20,
    textTransform: 'capitalize'
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%'
  }
});
