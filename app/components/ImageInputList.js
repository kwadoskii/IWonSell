import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ImageInput from "./ImageInput";

export default function ImageInputList({ imageUris = [], onAddImage, onRemoveImage }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
        ref={scrollView}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput imageUri={uri} onChangeImage={() => onRemoveImage(uri)} />
            </View>
          ))}

          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});
