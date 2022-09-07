import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export default function MapScreen({ route }) {
  console.log(route.params.location.coords.latitude);
  console.log(route.params);
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, marginHorizontal: 16 }}
        initialRegion={{
          longitude: route.params.location.coords.longitude,
          latitude: route.params.location.coords.latitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            longitude: route.params.location.coords.longitude,
            latitude: route.params.location.coords.latitude,
          }}
          title={route.params.title}
        ></Marker>
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  text: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "DMMono-Regular",
  },
});
