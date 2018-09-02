import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export class ReviewScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Leave a review (coming soon)</Text>
        <Button
          title="Start Over"
          buttonStyle={{width:'100%',marginTop:10}}
          backgroundColor="#39A675"
          onPress={() => this.props.navigation.navigate('Home')}
        />
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
