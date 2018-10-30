import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { WebBrowser, MapView, Video } from 'expo';
import TabBarIcon from '../components/TabBarIcon';
import { LoginScreen } from '../screens/LoginScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { FindScreen } from '../screens/FindScreen';
import { VendorScreen } from '../screens/VendorScreen';
import { SuccessScreen } from '../screens/SuccessScreen';
import { MapScreen } from '../screens/MapScreen';
import { ThankYouScreen } from '../screens/ThankYouScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { tintColor } from '../constants/Colors.js';
import { Hoshi } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';

export default createStackNavigator(
  {
    Home: HomeScreen,
    Find: FindScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Vendor: {
      screen: VendorScreen,
      navigationOptions: () => ({
        title: `Greenlight Dining`,
        headerBackTitle: null,
        headerLeft: null
      }),
    },
    Success: SuccessScreen,
    Map: MapScreen,
    ThankYou: ThankYouScreen,
    Review: ReviewScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  developmentModeText: {
    margin: 20,
    color: '#fff',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  headingText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 180,
    marginBottom: 20,
  },
  overlayText: {
    paddingHorizontal: 20,
    marginTop: 235,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
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
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    height:40,
    color:'#000',
  },
  ratingImage: {
    height: 40,
    width: 40
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  listItem: {
    height: 100,
  }
});
