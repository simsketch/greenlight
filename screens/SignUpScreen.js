import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { Button, CheckBox } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import { WebBrowser } from 'expo';
import { tintColor } from '../constants/Colors.js';

export class SignUpScreen extends React.Component {
    state = {
      termsChecked: true,
      newsChecked: true,
    }
    render() {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.titleBar}>Sign Up Screen</Text>
          <Hoshi
            label="Name"
            borderColor= { '#00e676' }
          />
          <Hoshi
            label="Email Address"
            borderColor= { '#00e676' }
          />
          {/* <Hoshi
            label="Phone Number (for text notifications)"
            borderColor= { '#00e676' }
          /> */}
          <Hoshi
            label="Password"
            type="password"
            secureTextEntry={true}
            borderColor= { '#00e676' }
          />
          <CheckBox
            title='I agree with the terms and conditions'
            checked={this.state.termsChecked}
            checkedColor="#00E676"
            uncheckedColor="#00E676"
            onPress={() => this.setState({termsChecked:!this.state.termsChecked})}
          />
          <CheckBox
            title='I agree to receive updates'
            checked={this.state.newsChecked}
            checkedColor="#00E676"
            uncheckedColor="#00E676"
            onPress={() => this.setState({newsChecked:!this.state.newsChecked})}
          />
          <Button
            title="Sign Up"
            buttonStyle={{marginTop:50}}
            backgroundColor="#00E676"
            onPress={() => this.props.navigation.navigate('Find')}
          />
        </ScrollView>
      );
    }
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleBar: {
      backgroundColor: '#00e676',
      alignSelf: 'stretch',
      textAlign: 'center',
      color: '#fff',
      padding:20,
      paddingBottom:40,
      marginBottom:40,
      height:30,
    },
});