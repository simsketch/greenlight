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
    usernameInput: 'username',
    passwordInput: 'password',
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
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleBar}>Login Screen</Text>
        <Hoshi
          label="Email Address"
          borderColor= { '#00e676' }
          value={this.state.usernameInput}
          onChangeText={(usernameInput) => this.setState({usernameInput})}
        />
        <Hoshi
          label="Password"
          borderColor= { '#00e676' }
          value={this.state.passwordInput}
          secureTextEntry={true}
          onChangeText={(passwordInput) => this.setState({passwordInput})}
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
          onPress={() => this._storeLogin(this.state.usernameInput,this.state.passwordInput)}
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
