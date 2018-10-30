import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableHighlight
} from 'react-native';

import { Button, CheckBox } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import { WebBrowser } from 'expo';
import { tintColor } from '../constants/Colors.js';
import * as firebase from 'firebase';

export class SignUpScreen extends React.Component {
    state = {
      termsChecked: true,
      newsChecked: true,
      email: "",
      password: "",
    }
    componentDidMount() {
      const config = {
        apiKey: "AIzaSyAXY8wIYsEhL1M0oNZIZ5-Ssx35B8n6xSc",
        authDomain: "greenlight-dining.firebaseapp.com",
        databaseURL: "https://greenlight-dining.firebaseio.com",
        projectId: "greenlight-dining",
        storageBucket: "greenlight-dining.appspot.com",
        messagingSenderId: "971281383517"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
    }
    storePromoCode(userId, promoCode) {
      firebase.database().ref('users/' + userId).set({
        promos: promoCode
      });
    }
    retrievePromoCodeWhenUpdated(userId) {
      firebase.database().ref('users/' + userId).on('value', (snapshot) => {
        const promos = snapshot.val().promos;
        console.log("New promo code: " + promos);
      });
    }
    onRegister = () => {
      // alert(JSON.stringify(this.state.email));
    if(this.state.termsChecked) {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.props.navigation.navigate('Vendor');
        Alert.alert(
          'You\'re signed up!',
          'I hope you\'re hungry!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
        //alert(user);
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
        Alert.alert(
          'Signup Error',
          message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      });
      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // Updates the user attributes:
      //     user.updateProfile({ // <-- Update Method here
      //       displayName: this.state.name,
      //       // photoURL: "https://example.com/jane-q-user/profile.jpg"
      //     }).then(function() {
      //       console.log("name updated to "+ this.state.name);
      //       // Profile updated successfully!
      //       //  "NEW USER NAME"
      //       // var displayName = user.displayName;
      //       // "https://example.com/jane-q-user/profile.jpg"
      //       // var photoURL = user.photoURL;
      //     }, function(error) {
      //       // An error happened.
      //     });     

      //   }
      // });
    } else {
      alert('You must accept the terms and conditions in order to continue.');
    }
    }
    viewTerms = () => {
      const url = 'http://greenlightdining.com/terms';
      WebBrowser.openBrowserAsync(url);
    };
    render() {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.titleBar}>Sign Up Screen</Text>
          {/* <Hoshi
            label="Full Name"
            borderColor= { '#00e676' }
            onChange={(name)=> this.setState({name})}
          /> */}
          <Hoshi
            label="Email Address"
            borderColor= { '#00e676' }
            autoCapitalize="none"
            onChangeText={(email)=> this.setState({email})}
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
            autoCapitalize="none"
            onChangeText={(password)=> this.setState({password})}
          />
          <CheckBox
            title='I agree with the terms and conditions'
            checked={this.state.termsChecked}
            checkedColor="#00E676"
            uncheckedColor="#00E676"
            onPress={() => this.setState({termsChecked:!this.state.termsChecked})}
          />
          <Text style={styles.viewTerms} onPress={() => this.viewTerms()}>
          Click here to view terms and conditions
          </Text>

          {/* <CheckBox
            title='I agree to receive updates'
            checked={this.state.newsChecked}
            checkedColor="#00E676"
            uncheckedColor="#00E676"
            onPress={() => this.setState({newsChecked:!this.state.newsChecked})}
          /> */}
          <Button
            title="Sign Up"
            buttonStyle={{marginTop:50}}
            backgroundColor="#00E676"
            onPress={() => this.onRegister()}
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
    viewTerms: {
      textAlign:'center',
      marginTop: 20,
      color: '#979797'
    }
});