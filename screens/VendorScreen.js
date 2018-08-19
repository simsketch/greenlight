import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class VendorScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
      isMapShowing: true
  };
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
      <Text>Vendor</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
