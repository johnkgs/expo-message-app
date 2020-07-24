import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Keyboard,
  Alert,
} from "react-native";

import { Formik } from "formik";
import firebase from "firebase";
import * as yup from "yup";

import { Ionicons } from "@expo/vector-icons";

import CustomInput from "../../components/CustomInput";
import ErrorMessage from "../../components/ErrorMessage";
import logo from "../../assets/logo.png";
import styles from "./styles";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [toggleVisibility, setToggleVisibility] = useState(true);
  const [iconName, setIconName] = useState("ios-eye-off");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [translate] = useState(new Animated.Value(0));

  const [keyboardHeight] = useState(new Animated.Value(200));

  const TouchableOpacityAnimated = Animated.createAnimatedComponent(
    TouchableOpacity
  );

  useEffect(() => {
    function animatedInput() {
      Animated.timing(translate, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setToggleEdit(true);
    }
    animatedInput();
  }, []);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", (e) =>
      keyboardEvent(e, true)
    );

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", (e) =>
      keyboardEvent(e, false)
    );

    return function cleanup() {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  function keyboardEvent(event, isShow) {
    let heightOS = 0;

    Animated.timing(keyboardHeight, {
      duration: event.duration,
      toValue: isShow ? heightOS : 200,
      useNativeDriver: false,
    }).start();
  }

  async function handleLogin(values) {
    const { email, password } = values;

    setToggleEdit(false);
    setLoading(true);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .catch((error) => {
        setToggleEdit(true);
        setLoading(false);
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/too-many-requests") {
          errorMessage =
            "Muitas tentativas de login sem êxito. Por favor, tente novamente mais tarde.";
        } else if (errorCode === "auth/user-not-found") {
          errorMessage = "E-mail ou senha inválidos";
        } else if (errorCode === "auth/wrong-password") {
          errorMessage = "E-mail ou senha inválidos";
        }
        Alert.alert("", errorMessage);
      });
  }

  function toggleEyeIcon() {
    setToggleVisibility(!toggleVisibility);
    setIconName(iconName === "ios-eye" ? "ios-eye-off" : "ios-eye");
  }

  function goToSignup() {
    navigation.navigate("Signup");
  }

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          styles.content,
          {
            bottom: keyboardHeight,
          },
        ]}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            translateX: translate.interpolate({
              inputRange: [0, 100],
              outputRange: [-250, 0],
            }),
          }}
        >
          <Image source={logo} />
          <Text style={styles.logoText}>MessageApp</Text>
        </Animated.View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            errors,
          }) => (
            <>
              <Animated.View
                style={{
                  translateX: translate.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-350, 0],
                  }),
                }}
              >
                <View style={styles.inputContainer}>
                  <Ionicons
                    style={{ padding: 10 }}
                    name="ios-mail"
                    size={24}
                    color="#000"
                  />
                  <CustomInput
                    value={values.email.trim()}
                    onChangeText={handleChange("email")}
                    placeholder="E-mail"
                    onBlur={handleBlur("email")}
                    editable={toggleEdit}
                  />
                </View>

                <ErrorMessage errorValue={touched.email && errors.email} />
              </Animated.View>

              <Animated.View
                style={{
                  translateX: translate.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-450, 0],
                  }),
                }}
              >
                <View style={styles.inputContainer}>
                  <Ionicons
                    style={{ padding: 10 }}
                    name="ios-lock"
                    size={24}
                    color="#000"
                  />
                  <CustomInput
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="Senha"
                    onBlur={handleBlur("password")}
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

                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
              </Animated.View>

              {isSubmitting && loading ? (
                <View style={styles.loginButton}>
                  <ActivityIndicator size="small" color="#FFF" />
                </View>
              ) : (
                <TouchableOpacityAnimated
                  style={[
                    styles.loginButton,
                    {
                      translateX: translate.interpolate({
                        inputRange: [0, 100],
                        outputRange: [-550, 0],
                      }),
                    },
                  ]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacityAnimated>
              )}
            </>
          )}
        </Formik>
        <Animated.View
          style={[
            styles.signupButtonContainer,
            {
              translateX: translate.interpolate({
                inputRange: [0, 100],
                outputRange: [-550, 0],
              }),
            },
          ]}
        >
          <Text style={styles.signupButtonText1}>Não possui uma conta?</Text>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={styles.signupButtonText2}> Crie uma</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("E-mail")
    .email("Entre com um email válido")
    .required("Digite um email registrado")
    .trim(),
  password: yup
    .string()
    .label("Senha")
    .required("Digite uma senha registrada")
    .min(6, "Sua senha precisa ter no minímo 6 caracteres"),
});

export default Login;
