import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ThankYouScreen extends React.Component {
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
      <Text>ThankYou</Text>
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
