import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  AppState,
  AppStateStatus
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

import UserImage from '../../components/UserImage';
import Loading from '../../components/Loading';
import { useStateValue } from '../../state/ContextProvider';
import { UserData } from '../../common/types';
import styles from './styles';

const Friends = () => {
  const { state } = useStateValue();
  const navigation = useNavigation();
  const [friendList, setFriendList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);

  const userUid = firebase.auth().currentUser?.uid!;
  const userData = firebase.database().ref('users');
  const friendsData = firebase.database().ref('friends');

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    if (appState === 'active') {
      userData.child(userUid).update({
        status: 'online'
      });
    } else {
      userData.child(userUid).update({
        status: 'offline'
      });
    }
  }, [appState]);

  useEffect(() => {
    let isMounted = true;

    friendsData
      .child(userUid)
      .child('acceptedFriends')
      .on('value', snapshot => {
        setLoading(true);
        setFriendList([]);
        if (snapshot.exists()) {
          snapshot.forEach(snap => {
            userData.on('child_added', userSnapshot => {
              if (isMounted) {
                if (snap.val().uid === userSnapshot.val().uid) {
                  setFriendList(prevState => {
                    return [...prevState, userSnapshot.val()];
                  });
                }
              }
              setLoading(false);
            });

            userData.on('child_changed', userSnapshot => {
              if (isMounted) {
                setFriendList(prevState => {
                  const newFriendList = prevState;
                  newFriendList.forEach(fL => {
                    if (fL.uid === userSnapshot.val().uid) {
                      fL.status = userSnapshot.val().status;
                      fL.userImage = userSnapshot.val().userImage;
                    }
                  });

                  return [...newFriendList];
                });
              }
            });
          });
        } else {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      userData.off();
      friendsData.off();
      setFriendList([]);
    };
  }, []);

  const renderData = ({ item }: { item: UserData }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', item)}
      style={[
        styles.userContainer,
        {
          backgroundColor: state.theme.surface,
          borderBottomColor: state.theme.primary
        }
      ]}
    >
      <View>
        <View style={styles.userImageContainer}>
          {item.userImage ? (
            <Image
              resizeMode="cover"
              source={{
                uri: item.userImage
              }}
              style={styles.userImage}
            />
          ) : (
            <UserImage size={46} />
          )}
        </View>
        <View
          style={[
            styles.status,
            {
              borderColor: state.theme.surface,
              backgroundColor: item.status === 'online' ? '#2ed411' : '#e62f22'
            }
          ]}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text
          numberOfLines={2}
          style={[
            styles.nameTextContainer,
            {
              color: state.theme.onSurface
            }
          ]}
        >
          {item.name} {item.surname}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {loading ? (
        <Loading />
      ) : (
        <Text
          numberOfLines={2}
          style={{ fontSize: 16, color: state.theme.onBackground }}
        >
          Não há ninguém em sua lista de amigos
        </Text>
      )}
    </View>
  );

  const renderHeaderComponent = () => (
    <View
      style={[
        styles.userListContainer,
        { borderBottomColor: state.theme.primary }
      ]}
    >
      <Text
        style={[
          styles.userListTextContainer,
          { color: state.theme.onBackground }
        ]}
      >
        Lista de Amigos
      </Text>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: state.theme.background }]}
    >
      <FlatList
        data={friendList}
        renderItem={renderData}
        keyExtractor={item => item.uid}
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={renderHeaderComponent}
      />
    </View>
  );
};

export default Friends;
