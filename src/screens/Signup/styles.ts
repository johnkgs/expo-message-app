import { StyleSheet, Dimensions } from 'react-native';

var { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32
  },
  halfContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  sizeHalfContainer: {
    width: '47%'
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderWidth: 1,
    borderColor: '#137B9C',
    height: 48,
    borderRadius: 4,
    marginTop: 10,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
    elevation: 5
  },
  sizeContainer: {
    width: '100%'
  },
  registerButtonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  registerButton: {
    width: width - 200,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#137B9C',
    borderRadius: 5,
    elevation: 5
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500'
  }
});
