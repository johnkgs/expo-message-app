import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserImageConfig } from '../../common/types';

const UserImage: React.FC<UserImageConfig> = ({ size }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Ionicons name="ios-person" size={size} />
  </View>
);

export default UserImage;
