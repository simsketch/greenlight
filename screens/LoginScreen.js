import React from 'react';
import {
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Hoshi } from 'react-native-textinput-effects';
import { tintColor } from '../constants/Colors.js';
import { Button, CheckBox } from 'react-native-elements';
import { TextInput } from '../node_modules/react-native-gesture-handler';
import * as firebase from 'firebase';


export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    // const email = AsyncStorage.getItem('emailAddress');
    // alert(JSON.stringify(email));
  }
  state = {
    rememberMeChecked: true,
    // usernameInput: AsyncStorage.getItem('emailAddress'),
    // passwordInput: AsyncStorage.getItem('password'),
    // usernameInput: AsyncStorage.getItem('emailAddress') || 'username',
    // passwordInput: AsyncStorage.getItem('password') || 'password',
    email: '',
    password: '',
    // loading: true,
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
  onLogin = () => {
    // alert(JSON.stringify(this.state.email));
  firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      this.props.navigation.navigate('Vendor');
      alert("Welcome back! So you DO like saving 10% every meal!");
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
      alert(message);
    });
  }
  _storeLogin = async (un, pw) => {
    //alert(un,pw);
    console.log(un);
    // if (this.state.rememberMeChecked) {
    //   try {
    //     await
    //     // alert(JSON.stringify(this.state.usernameInput));
    //     AsyncStorage.setItem('emailAddress', "mike");
    //     alert(AsyncStorage.getItem('emailAddress').toString());
    //     // alert(JSON.stringify(this.state.passwordInput));
    //     AsyncStorage.setItem('password', JSON.stringify(pw));
    //   } catch (error) {
    //     alert('There was an error saving your login information to this device.');
    //   }
    // }
    this.props.navigation.navigate('Find');
  }
  sendPasswordReset() {
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }
  onRegister = () => {
    // alert(JSON.stringify(this.state.email));
  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      // this.props.navigation.navigate('Find');
      this.props.navigation.navigate('Vendor');
      Alert.alert(
        'Welcome back!',
        'So you DO like saving 10% every meal!',
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
        'Login Error',
        message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    });
  }
  render() {
    // The application is initialising
    // if (this.state.loading) return null;
    // The user is an Object, so they're logged in
    // if (this.state.user) this.props.navigation.navigate('Find');
    // The user is null, so they're logged out, show the login fields
    return (
      <View style={styles.container}>
        <Text style={styles.titleBar}>Login Screen</Text>
        <Hoshi
          label="Email Address"
          borderColor= { '#00e676' }
          value={this.state.email}
          autoCapitalize="none"
          onChangeText={(email) => this.setState({email})}
        />
        <Hoshi
          label="Password"
          borderColor= { '#00e676' }
          value={this.state.password}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => this.setState({password})}
        />
        <CheckBox
          title='Remember me'
          checked={this.state.rememberMeChecked}
          checkedColor="#00E676"
          uncheckedColor="#00E676"
          onPress={() => this.setState({rememberMeChecked:!this.state.rememberMeChecked})}
        />
        <Button
          title="Login"
          buttonStyle={{marginTop:50}}
          backgroundColor="#00E676"
          onPress={() => this.onLogin()}
        />
        <Button
          title="Reset Password"
          buttonStyle={{marginTop:50}}
          backgroundColor="#00E676"
          onPress={() => this.sendPasswordReset()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 180,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
