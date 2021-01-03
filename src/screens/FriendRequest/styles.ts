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
  nameContainer: {
    maxWidth: width - 200,
    width: 0,
    flexGrow: 1,
    flex: 1,
    marginLeft: 10
  },
  nameTextContainer: {
    fontSize: 20,
    textTransform: 'capitalize'
  },
  optionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-end',
    right: 10,
    top: 0
  },
  acceptButton: {
    backgroundColor: '#2ed411',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 36,
    width: 36,
    borderRadius: 18,
    marginLeft: 10,
    padding: 5,
    elevation: 10
  },
  rejectButton: {
    backgroundColor: '#e62f22',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 36,
    width: 36,
    borderRadius: 18,
    marginLeft: 10,
    padding: 5,
    elevation: 10
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%'
  }
});
