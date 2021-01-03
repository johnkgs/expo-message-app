import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import CustomInput from '../../components/CustomInput';
import UserImage from '../../components/UserImage';
import { useStateValue } from '../../state/ContextProvider';
import { UserData } from '../../common/types';
import styles from './styles';

const AddFriends = () => {
  const navigation = useNavigation();
  const { state } = useStateValue();
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchText, setSearchText] = useState('');

  const userData = firebase.database().ref('users');
  const userUid = firebase.auth().currentUser?.uid;

  useEffect(() => {
    let isMounted = true;
    userData.on('child_added', snapshot => {
      if (isMounted) {
        if (snapshot.val().uid !== userUid) {
          setUsers(prevState => {
            return [...prevState, snapshot.val()];
          });
        }
      }
    });

    return () => {
      isMounted = false;
      setUsers([]);
    };
  }, []);

  const filteredData = users.filter(item => {
    return item.name.indexOf(searchText) >= 0;
  });

  const renderData = ({ item }: { item: UserData }) => (
    <>
      {!!searchText && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileToFriendRequest', item);
            setSearchText('');
          }}
          style={[
            styles.userContainer,
            {
              backgroundColor: state.theme.surface,
              borderBottomColor: state.theme.primary
            }
          ]}
        >
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
      )}
    </>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: state.theme.background }]}
    >
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: state.theme.primary,
            backgroundColor: state.theme.inputBackground
          }
        ]}
      >
        <CustomInput
          returnKeyType="search"
          placeholder="Buscar amigo..."
          onChangeText={(text: string) => setSearchText(text)}
          placeholderTextColor={state.theme.dark ? '#9e9e9e' : '#595959'}
          style={[
            styles.input,
            {
              color: state.theme.onInputBackground
            }
          ]}
          value={searchText}
        />
        <Ionicons
          name="ios-search"
          style={{ padding: 10 }}
          size={24}
          color={state.theme.onSurface}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderData}
        keyExtractor={item => item.uid}
      />
    </View>
  );
};

export default AddFriends;
