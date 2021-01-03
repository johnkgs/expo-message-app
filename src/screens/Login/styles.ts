import { StyleSheet, Dimensions } from 'react-native';

var { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingHorizontal: 32
  },
  logoText: {
    fontSize: 24,
    marginLeft: 10
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderWidth: 1,
    borderColor: '#137B9C',
    height: 48,
    borderRadius: 4,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    width: '100%'
  },
  loginButton: {
    width: width - 200,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#137B9C',
    borderRadius: 5,
    marginTop: 20,
    elevation: 5
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500'
  },
  signupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  signupButtonText1: {
    color: '#000000',
    fontSize: 15
  },
  signupButtonText2: {
    color: '#00bfff',
    fontSize: 15
  }
});
