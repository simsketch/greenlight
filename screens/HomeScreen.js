import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicator,
  Alert
} from 'react-native';
import { WebBrowser, Video } from 'expo';
import { tintColor } from '../constants/Colors.js';
import { Hoshi } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
      videoURI: Expo.Asset.fromModule(require('../assets/videos/food.mp4')).uri,
      // gifURI: Expo.Asset.fromModule(require('../assets/videos/food.gif')).uri,
      loginTitle: "Let\'s Eat",
      attemptingLogin: true,
  };
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
    this.getCodeAndLogin();
    this.timer = setInterval(()=> this.getCodeAndLogin(), 4000);
  }
  onLogin = () => {
    // alert(JSON.stringify(this.state.email));
  
  firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(this._storeLogin(this.state.email, this.state.password))
    .then((user) => {
      // this.props.navigation.navigate('Vendor');
      this.props.navigation.navigate('Vendor', {
        email: this.state.email
      });
      // alert("Welcome back! So you DO like saving 10% every meal!");
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
      // alert("Welcome back "+JSON.stringify(user.email));
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
      alert(message);
    });
  }
  retrieveEmailAndPassword() {
    console.log('attempting login')
    this.setState({ 'attemptingLogin': true });
    AsyncStorage.getItem('emailAddress')
    .then((value) => {
        // alert(value);
        this.setState({ 'email': value });
        AsyncStorage.getItem('password')
        .then((value) => {
            // alert(value);
            this.setState({ 'password': value });
            this.setState({ 'attemptingLogin': false });
            this.props.navigation.navigate('Vendor', {
              email: this.state.email
            });
          })
        .catch(err, function() {
          console.log(err);
          this.setState({ 'attemptingLogin': false });
        })
    })
    .catch(err, function() {
      console.log(err);
      this.setState({ 'attemptingLogin': false });
    })
  }
  
  cancelTable = () => {
    const id = this.state.vendorId;
    const numberOfGuests = this.state.numberOfGuests;
    let capacity = this.state.capacity;
    // capacity = capacity+","+numberOfGuests;
    // if (capacity!="") {
    //   capacityArray = capacity.split(",").filter(Number);
    //   if (capacityArray.length >= 1) {
    //   capacity = capacity.split(",").filter(Number).join(",");
    //   } else {
    //     capacity = "";
    //   }
    // } else {
    //   capacity = "0";
    // }
    console.log("capacity: "+capacity);
    fetch(`http://app.greenlightdining.com/api/vendors/${id}/update/${capacity}`, { method: 'PUT' })
      .then(res => {
        console.log("Table capacity has been updated: "+capacity);
      })
      .catch(err => {
        alert(err);
      });
    Alert.alert(
      'Cancel table?',
      'You are about to cancel your table. You won\'t be saving 10% if you cancel.',
      [
        {text: 'Keep Table', onPress: () => {
          // console.log('Keeping table');
        }, style: 'cancel'},
        {text: 'Cancel', onPress: () => {
          this.clearCode();
          }
        },
      ],
      { cancelable: false }
    )

    //alert("Cancel table?");
    //this.props.navigation.navigate('Vendor');
  };
  clearCode = async () => {
    this.setState({promoCode:null});
    this.setState({timestamp:null});
    this.setState({capacity:null});
    this.setState({numberOfGuests:null});
    this.setState({vendorId:null});
    try {
      await
      AsyncStorage.setItem('promoCode', '');
      AsyncStorage.setItem('timestamp', '');
      AsyncStorage.setItem('capacity', '');
      AsyncStorage.setItem('numberOfGuests', '');
      AsyncStorage.setItem('vendorId', '');
      this.props.navigation.navigate('Vendor');
    } catch (error) {
      alert('Save error: '+error);
    }
  }
  getCodeAndLogin() {
    AsyncStorage.getItem('timestamp')
    .then((value) => {
      // console.log('timestamp: '+value);
        this.setState({ 'timestamp': value });
        // console.log(typeof value);
        // console.log(typeof value == string && value.length > 0)
        if (typeof value == 'string' && value.length > 0) {
          console.log('timestamp attempting login false');
        }
        else {
        AsyncStorage.getItem('rememberMeChecked')
        .then((value) => {
            // alert(value);
            this.setState({ 'rememberMeChecked': Boolean(value) })
            if (value) {
              this.retrieveEmailAndPassword();
            }
          })
        }
        const diff = new Date().getTime() - new Date(+(value));
        if(diff<1210000) {
          AsyncStorage.getItem('promoCode')
          .then((value) => {
            console.log('promoCode: '+value);
              this.setState({ 'promoCode': value })
          });
          AsyncStorage.getItem('capacity')
          .then((value) => {
            console.log('capacity: '+value);
              this.setState({ 'capacity': value })
          });
          AsyncStorage.getItem('numberOfGuests')
          .then((value) => {
            console.log('numberOfGuests: '+value);
              this.setState({ 'numberOfGuests': value })
          });
          AsyncStorage.getItem('vendorId')
          .then((value) => {
            console.log('vendorId: '+value);
              this.setState({ 'vendorId': value })
          });
        }
      })
      this.setState({'attemptingLogin':false})
  }
  getCode() {
    AsyncStorage.getItem('timestamp')
    .then((value) => {
      console.log('timestamp: '+value);
        this.setState({ 'timestamp': value });
        const diff = new Date().getTime() - new Date(+(value));
        if(diff<1210000) {
          AsyncStorage.getItem('promoCode')
          .then((value) => {
            console.log('promoCode: '+value);
              this.setState({ 'promoCode': value })
          });
          AsyncStorage.getItem('capacity')
          .then((value) => {
            console.log('capacity: '+value);
              this.setState({ 'capacity': value })
          });
          AsyncStorage.getItem('numberOfGuests')
          .then((value) => {
            console.log('numberOfGuests: '+value);
              this.setState({ 'numberOfGuests': value })
          });
          AsyncStorage.getItem('vendorId')
          .then((value) => {
            console.log('vendorId: '+value);
              this.setState({ 'vendorId': value })
          });
        }
      })
  }
  welcomeMessage() {
      return (
        <Text style={styles.developmentModeText}>
        Find a table NOW!{"\n"}
      </Text>
      )
  }
  renderPromoCode() {
    if (this.state.promoCode) {
      return (
      <View style={styles.promoCode}>
      <Text style={styles.promoCodeText}>Your Greenlight code is {this.state.promoCode}{"\n"}Your table is waiting!</Text>
      <Button
        title="Cancel Table"
        backgroundColor="#871f1f"
        onPress={() => this.cancelTable()}
      />
      </View>
      );
    }
  }
  renderLoginButtons() {
    if (!this.state.promoCode) {
      return(
        <View>
        <Button
          title="Sign Up"
          backgroundColor="#00E676"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button
          title="Login"
          backgroundColor="#39A675"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        </View>
      )
    }
  }
  buzzWords() {
      return (
          <Text style={styles.buzzWords}>
            EAT NOW &amp; SAVE 10%{"\n"}
            VIP DINING{"\n"}
            SAVE TIME &amp; MONEY{"\n"}
          </Text>
      )
  }
  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      { this.state.attemptingLogin ? <ActivityIndicator size="small" color="#00ff00" /> : (
      <View>
        <Video
          source={{ uri: 'http://teragigame.ga/greenlight/food.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: '100%', height: '100%' }}
        />
        {/* <Image
          source={{ uri: 'http://teragigame.ga/greenlight/food.jpg' }}
          style={{ width: '100%', height: '100%' }}
        /> */}
        <ScrollView style={styles.overlay}>
          <View style={styles.overlayText}>
          {this.buzzWords()}
            <Image
              source={
                __DEV__
                  ? require('../assets/images/logo-beta.png')
                  : require('../assets/images/logo.png')
              }
              style={styles.welcomeImage}
            />
            {this.welcomeMessage()}
            {this.renderPromoCode()}
            {this.renderLoginButtons()}
            </View>
        </ScrollView>
      </View>
    )
            }
      </View>
  )}
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
  buzzWords: {
    fontSize: 20,
    fontWeight:'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  promoCode: {
    marginBottom: 10,
  },
  promoCodeText: {
    fontSize: 20,
    fontWeight:'bold',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  overlayText: {
    paddingHorizontal: 20,
    marginTop: 85,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 180,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: -3,
    marginLeft: -10,
    alignSelf:'center',
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
