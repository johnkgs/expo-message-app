import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Animated,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import firebase from 'firebase';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';

import CustomInput from '../../components/CustomInput';
import ErrorMessage from '../../components/ErrorMessage';
import logo from '../../assets/logo.png';
import {
  HandleSubmitFormik,
  IconNameOptions,
  SignupValues
} from '../../common/types';
import styles from './styles';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [toggleVisibility, setToggleVisibility] = useState(true);
  const [iconName, setIconName] = useState<IconNameOptions>('ios-eye-off');
  const [toggleVisibility2, setToggleVisibility2] = useState(true);
  const [iconName2, setIconName2] = useState<IconNameOptions>('ios-eye-off');
  const [toggleEdit, setToggleEdit] = useState(false);
  const [translate] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(translate, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true
    }).start();
    setToggleEdit(true);
  }, []);

  const handleSignUp = async (values: SignupValues) => {
    const { password, name, surname, email } = values;

    setToggleEdit(false);
    setLoading(true);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(userCredentials => {
        const userData = firebase
          .database()
          .ref('users')
          .child(userCredentials.user?.uid!);

        userData.set({
          uid: userCredentials.user?.uid,
          name: name.toLowerCase(),
          surname: surname.toLowerCase(),
          userImage: ''
        });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          errorMessage = 'Esse e-mail já está registrado';
        } else if (errorCode === 'auth/weak-password') {
          errorMessage = 'Sua senha precisa ter no minímo 6 caracteres';
        }

        setToggleEdit(true);
        setLoading(false);
        Alert.alert('', errorMessage);
      });
  };

  const toggleEyeIcon = () => {
    setToggleVisibility(!toggleVisibility);
    setIconName(iconName === 'ios-eye' ? 'ios-eye-off' : 'ios-eye');
  };

  const toggleEyeIcon2 = () => {
    setToggleVisibility2(!toggleVisibility2);
    setIconName2(iconName2 === 'ios-eye' ? 'ios-eye-off' : 'ios-eye');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={styles.content}>
        <Animated.View
          style={{
            translateX: translate.interpolate({
              inputRange: [0, 100],
              outputRange: [-250, 0]
            })
          }}
        >
          <Image source={logo} style={{ marginBottom: 10 }} />
        </Animated.View>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({
            isSubmitting,
            touched,
            handleBlur,
            handleChange,
            values,
            handleSubmit,
            errors
          }) => (
            <>
              <View style={styles.halfContainer}>
                <View style={styles.sizeHalfContainer}>
                  <Animated.View
                    style={{
                      translateX: translate.interpolate({
                        inputRange: [0, 100],
                        outputRange: [-350, 0]
                      })
                    }}
                  >
                    <View style={styles.inputContainer}>
                      <CustomInput
                        value={values.name}
                        onChangeText={handleChange('name')}
                        placeholder="Nome"
                        onBlur={handleBlur('name')}
                        editable={toggleEdit}
                      />
                    </View>
                    <ErrorMessage value={touched.name && errors.name} />
                  </Animated.View>
                </View>

                <View style={styles.sizeHalfContainer}>
                  <Animated.View
                    style={{
                      translateX: translate.interpolate({
                        inputRange: [0, 100],
                        outputRange: [-350, 0]
                      })
                    }}
                  >
                    <View style={styles.inputContainer}>
                      <CustomInput
                        value={values.surname}
                        onChangeText={handleChange('surname')}
                        placeholder="Sobrenome"
                        onBlur={handleBlur('surname')}
                        editable={toggleEdit}
                      />
                    </View>
                    <ErrorMessage value={touched.surname && errors.surname} />
                  </Animated.View>
                </View>
              </View>

              <View style={styles.sizeContainer}>
                <Animated.View
                  style={{
                    translateX: translate.interpolate({
                      inputRange: [0, 100],
                      outputRange: [-450, 0]
                    })
                  }}
                >
                  <View style={styles.inputContainer}>
                    <CustomInput
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder="E-mail"
                      autoCapitalize="none"
                      onBlur={handleBlur('email')}
                      editable={toggleEdit}
                    />
                  </View>
                  <ErrorMessage value={touched.email && errors.email} />
                </Animated.View>

                <Animated.View
                  style={{
                    translateX: translate.interpolate({
                      inputRange: [0, 100],
                      outputRange: [-550, 0]
                    })
                  }}
                >
                  <View style={styles.inputContainer}>
                    <CustomInput
                      value={values.password}
                      onChangeText={handleChange('password')}
                      placeholder="Senha"
                      onBlur={handleBlur('password')}
                      secureTextEntry={toggleVisibility}
                      editable={toggleEdit}
                    />
                    <TouchableOpacity onPress={() => toggleEyeIcon()}>
                      <Ionicons
                        style={{ padding: 10 }}
                        name={iconName}
                        size={24}
                        color="#000"
                      />
                    </TouchableOpacity>
                  </View>

                  <ErrorMessage value={touched.password && errors.password} />
                </Animated.View>

                <Animated.View
                  style={{
                    translateX: translate.interpolate({
                      inputRange: [0, 100],
                      outputRange: [-650, 0]
                    })
                  }}
                >
                  <View style={styles.inputContainer}>
                    <CustomInput
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      placeholder="Confirme sua senha"
                      onBlur={handleBlur('confirmPassword')}
                      secureTextEntry={toggleVisibility2}
                      editable={toggleEdit}
                    />
                    <TouchableOpacity onPress={() => toggleEyeIcon2()}>
                      <Ionicons
                        style={{ padding: 10 }}
                        name={iconName2}
                        size={24}
                        color="#000"
                      />
                    </TouchableOpacity>
                  </View>

                  <ErrorMessage
                    value={touched.confirmPassword && errors.confirmPassword}
                  />
                </Animated.View>
              </View>

              <Animated.View
                style={[
                  styles.registerButtonContainer,
                  {
                    translateX: translate.interpolate({
                      inputRange: [0, 100],
                      outputRange: [-750, 0]
                    })
                  }
                ]}
              >
                {isSubmitting && loading ? (
                  <View style={styles.registerButton}>
                    <ActivityIndicator size="small" color="#FFF" />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleSubmit as HandleSubmitFormik}
                  >
                    <Text style={styles.registerButtonText}>Cadastrar</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            </>
          )}
        </Formik>
      </Animated.View>
    </ScrollView>
  );
};

const validationSchema = yup.object().shape({
  name: yup.string().label('Nome').required('* Obrigatório'),
  surname: yup.string().label('Sobrenome').required('* Obrigatório'),
  email: yup
    .string()
    .label('E-mail')
    .email('Entre com um email válido')
    .required('* Obrigatório'),
  password: yup
    .string()
    .label('Senha')
    .required('* Obrigatório')
    .min(6, 'Sua senha precisa ter no minímo 6 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password')],
      'Confirme sua senha precisa ser igual a senha'
    )
    .required('* Obrigatório')
});

export default Signup;
