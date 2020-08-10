import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as yup from "yup";

import { AppForm, AppFormField, SubmitButton, ErrorMessage } from "../components/forms";
import userApi from "../api/users";
import authApi from "../api/auth";
import colors from "../config/colors";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = yup.object().shape({
  firstname: yup.string().required().min(3).trim().label("Firstname"),
  lastname: yup.string().required().min(3).trim().label("Lastname"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must be the same")
    .label("Confirm Password"),
});

export default function RegisterScreen() {
  const auth = useAuth();
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);

  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      setVisible(true);
      if (registerApi.data) {
        setError(registerApi.data.message);
      } else {
        setError("An unexpected error occured.");
        console.log(result);
      }
      return;
    }

    const {
      data: { data: authToken },
    } = await loginApi.request(userInfo.email, userInfo.password);

    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />

        <ErrorMessage error={error} visible={visible} />
        <AppForm
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            //   avatar: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="firstname"
            placeholder="Firstname"
          />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="lastname"
            placeholder="Lastname"
          />
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
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="register" color="secondary" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    alignSelf: "center",
    height: 80,
    marginBottom: 20,
    marginTop: 50,
    width: 80,
  },
});
