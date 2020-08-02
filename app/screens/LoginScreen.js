import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as yup from "yup";

import { AppForm, AppFormField, ErrorMessage, SubmitButton } from "../components/forms";
import authApi from "../api/auth";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlesSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (result.data.status === "error") {
      setLoginFailed(true);
      setErrorMessage(result.data.data.message);
      return;
    }

    setLoginFailed(false);
    logIn(result.data.data);
  };
  return (
    <Screen style={styles.container}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handlesSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.error}>
          <ErrorMessage error={errorMessage} visible={loginFailed} />
        </View>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="login" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  error: {
    alignItems: "center",
  },
  logo: {
    alignSelf: "center",
    height: 80,
    marginBottom: 20,
    marginTop: 50,
    width: 80,
  },
});
