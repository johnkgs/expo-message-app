import React from 'react';
import { Text } from 'react-native';
import { ErrorMessageConfig } from '../../common/types';
import styles from './styles';

const ErrorMessage: React.FC<ErrorMessageConfig> = ({ value }) => (
  <Text style={styles.errorText}>{value}</Text>
);

export default ErrorMessage;
