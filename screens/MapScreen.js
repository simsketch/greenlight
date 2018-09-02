import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export class MapScreen extends React.Component {
  render() {
    return (
      <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 26.584162,
        longitude: -80.048381,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
