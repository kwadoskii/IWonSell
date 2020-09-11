import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as yup from "yup";

import {
  AppForm,
  AppFormField as FormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import AuthContext from "../auth/context";
import categoryApi from "../api/category";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = yup.object().shape({
  title: yup.string().required().min(1).label("Title"),
  price: yup.number().required().min(1).max(1000000).label("Price"),
  description: yup.string().required().label("Description"),
  category: yup.object().required().nullable().label("category"),
  images: yup.array().min(1, "Please select at least one image"),
});

export default function ListingEditScreen() {
  const getCategoriesApi = useApi(categoryApi.getCategories);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    getCategoriesApi.request();
  }, []);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location, user: user.id },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save listing");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <AppFormPicker
          items={getCategoriesApi.data}
          name="category"
          numberOfColums={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={5}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
});
