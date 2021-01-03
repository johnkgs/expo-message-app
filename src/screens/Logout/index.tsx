import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import firebase from 'firebase';
import Loading from '../../components/Loading';
import { useStateValue } from '../../state/ContextProvider';

const Logout = () => {
  const { dispatch } = useStateValue();
  const userData = firebase.database().ref('users');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    const logout = async () => {
      dispatch({
        type: 'disableDarkTheme'
      });

      const firebaseCurrentUser = firebase.auth().currentUser;
      if (firebaseCurrentUser) {
        await userData.child(firebaseCurrentUser.uid).update({
          status: 'offline'
        });
      }

      await firebase.auth().signOut();
    };

    setTimeout(() => {
      logout();
    }, 1500);

    return () => backHandler.remove();
  }, []);

  return <Loading />;
};

export default Logout;
