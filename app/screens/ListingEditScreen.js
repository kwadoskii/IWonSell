import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as yup from "yup";

import {
  AppForm,
  AppFormField as FormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = yup.object().shape({
  title: yup.string().required().min(1).label("Title"),
  price: yup.number().required().min(1).max(10000).label("Price"),
  description: yup.string().required().label("Description"),
  category: yup.object().required().nullable().label("category"),
  images: yup.array().min(1, "Please select at least one image"),
});

const categories = [
  {
    label: "Furniture",
    value: "5f1d8dfc24ba03121083c312",
    backgroundColor: "tomato",
    icon: "lamp",
  },
  {
    label: "Books",
    value: "5f1d8f02072c89351cc6ee6d",
    backgroundColor: "purple",
    icon: "book",
  },
  {
    label: "Games",
    value: "5f1d8f09072c89351cc6ee6e",
    backgroundColor: "green",
    icon: "card",
  },
  {
    label: "Camera",
    value: "5f1d8f12072c89351cc6ee6f",
    backgroundColor: "gold",
    icon: "camera",
  },
  { label: "Cars", value: 2, backgroundColor: "orange", icon: "car" },
  { label: "Clothing", value: 5, backgroundColor: "darkcyan", icon: "lock" },
  { label: "Sports", value: 6, backgroundColor: "lightblue", icon: "football" },
  { label: "Movies & Music", value: 7, backgroundColor: "darkblue", icon: "headphones" },
  { label: "Others", value: 9, backgroundColor: "grey", icon: "apps" },
];

export default function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing({ ...listing, location }, (progress) =>
      setProgress(progress)
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
          items={categories}
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
          numberOfLines={3}
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
