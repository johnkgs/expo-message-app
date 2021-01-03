import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  imageBox: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  userImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0'
  },
  userImage: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  addImageButton: {
    backgroundColor: '#5e636e',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  progressBar: {
    width: 100,
    borderRadius: 5,
    marginBottom: 5
  },
  progressBarText: {
    fontSize: 16
  },
  halfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sizeHalfContainer: {
    width: '47%'
  },
  textHalfContainer: {
    marginVertical: 10,
    fontSize: 18
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderWidth: 1,
    height: 48,
    borderRadius: 4,
    marginVertical: 5,
    paddingLeft: 10,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: 16,
    textTransform: 'capitalize'
  },
  darkThemeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
    marginTop: 20
  },
  darkThemeTextContainer: {
    fontSize: 16,
    marginHorizontal: 5
  },
  logoutButtonContainer: {
    alignItems: 'center'
  },
  logoutButton: {
    width: 200,
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  logoutButtonText: {
    fontSize: 20,
    color: '#ffffff'
  }
});
