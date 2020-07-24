import React from "react";
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
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";

const validationSchema = yup.object().shape({
  title: yup.string().required().min(1).label("Title"),
  price: yup.number().required().min(1).max(10000).label("Price"),
  description: yup.string().required().label("Description"),
  category: yup.object().required().nullable().label("category"),
  images: yup.array().min(1, "Please select at least one image"),
});

const categories = [
  { label: "Furniture", value: 1, backgroundColor: "tomato", icon: "lamp" },
  { label: "Cars", value: 2, backgroundColor: "orange", icon: "car" },
  { label: "Camera", value: 3, backgroundColor: "gold", icon: "camera" },
  { label: "Games", value: 4, backgroundColor: "green", icon: "card" },
  { label: "Clothing", value: 5, backgroundColor: "darkcyan", icon: "lock" },
  { label: "Sports", value: 6, backgroundColor: "lightblue", icon: "football" },
  { label: "Movies & Music", value: 7, backgroundColor: "darkblue", icon: "headphones" },
  { label: "Books", value: 8, backgroundColor: "purple", icon: "book" },
  { label: "Others", value: 9, backgroundColor: "grey", icon: "apps" },
];

export default function ListingEditScreen() {
  const location = useLocation();

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={(values) => {
          const test = { ...values, category: values.category.value, location };
          console.log(test);
        }}
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
