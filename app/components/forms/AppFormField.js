import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

export default function AppFormField({ name, noError = false, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        style={{ flex: 1 }}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      {!noError && <ErrorMessage error={errors[name]} visible={touched[name]} />}
    </>
  );
}
