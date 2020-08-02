import React from "react";
import { StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import * as yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import Screen from "../components/Screen";

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
  return (
    <Screen style={styles.container} onPress={() => console.log("test")}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />

      <AppForm
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
          //   avatar: "",
        }}
        onSubmit={(values) => console.log(values)}
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
