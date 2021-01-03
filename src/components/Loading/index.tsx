import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useStateValue } from '../../state/ContextProvider';
import styles from './styles';

const Loading = () => {
  const { state } = useStateValue();
  return (
    <View style={[styles.loading, { backgroundColor: state.theme.background }]}>
      <ActivityIndicator size="large" color={state.theme.onBackground} />
    </View>
  );
};

export default Loading;
