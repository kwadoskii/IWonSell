import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function AppMapView({ region }) {
  const { latitude, longitude } = region;
  const initialRegion = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      <MapView initialRegion={initialRegion} style={styles.mapView}>
        <Marker coordinate={initialRegion} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    flex: 1,
    overflow: "hidden",
  },
  mapView: {
    flex: 1,
  },
});
