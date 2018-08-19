import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import { tintColor } from '../constants/Colors.js';
import { TextInput } from '../node_modules/react-native-gesture-handler';


export default class LoginScreen extends React.Component {
    state = {
        usernameInput: "Email Address",
        passwordInput: "Password",
        loginTitle: "Let\'s Eat"
    };
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/logo.png')
                  : require('../assets/images/logo.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.getStartedContainer}>
            {this.loginComponent()}

            <Text style={styles.getStartedText}>Get started by {this.signupButton()} or if you already have an account you can {this.loginButton()}.</Text>
          </View>
          <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(usernameInput) => this.setState({usernameInput})}
            value={this.state.usernameInput}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(passwordInput) => this.setState({passwordInput})}
            value={this.state.passwordInput}
          />
          <Text
          title={this.state.loginTitle}
          onPress={this.logSomething()}
          ></Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  logSomething() {
    console.log('button pressed!');
  }
  loginComponent() {
    const loginSection = () => {
        const signupWasClickedCallback = (data) => {
          console.log(data);
          alert('Signup callback, see log on the console to see the data.');
        };
        const loginWasClickedCallback = (data) => {
          console.log(data);
          alert('Login callback, see log on the console to see the data.');
        };
        const recoverPasswordWasClickedCallback = (data) => {
          console.log(data);
          alert('Recover password callback, see log on the console to see the data.');
        };
        return (
            <div>
                <ReactSignupLoginComponent
                    title="My awesome company"
                    handleSignup={signupWasClickedCallback}
                    handleLogin={loginWasClickedCallback}
                    handleRecoverPassword={recoverPasswordWasClickedCallback}
                />
            </div>
        );
    };
        return (
        <Text style={styles.developmentModeText}>
        {this.loginSection}
        </Text>
        )
  }
  
  welcomeMessage() {
      return (
        <Text style={styles.developmentModeText}>
        Greenlight &mdash; find a table NOW!
      </Text>
      )
  }
  signupButton() {
    const signupButton = (
        <Text onPress={this._handleSignUpPress} style={styles.helpLinkText}>
        signing up
        </Text>
    );
      return (
      <Text style={styles.developmentModeText}>
        {signupButton}
      </Text>
      )
  }
  loginButton() {
    const loginButton = (
        <Text onPress={this._handleLoginPress} style={styles.helpLinkText}>
        login
        </Text>
    );
      return (
      <Text style={styles.developmentModeText}>
        {loginButton}
      </Text>
      )
  }
  _handleSignUpPress = () => {
    WebBrowser.openBrowserAsync('https://placeholder.com/300x300?text=greenlight.app/signup');
  };
  _handleLoginPress = () => {
    WebBrowser.openBrowserAsync('https://placeholder.com/300x300?text=greenlight.app/login');
  };
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
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: tintColor,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
    backgroundColor:tintColor,
    alignItems:'stretch'

  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
