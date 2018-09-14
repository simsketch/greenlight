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
import { WebBrowser } from 'expo';
import { tintColor } from '../constants/Colors.js';
import { Hoshi } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
      videoURI: Expo.Asset.fromModule(require('../assets/videos/food.mp4')).uri,
      // gifURI: Expo.Asset.fromModule(require('../assets/videos/food.gif')).uri,
      loginTitle: "Let\'s Eat",
  };
  welcomeMessage() {
      return (
        <Text style={styles.developmentModeText}>
        Find a table NOW!
      </Text>
      )
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
        {/* <Video
          source={{ uri: this.state.videoURI }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: '100%', height: '100%' }}
        /> */}
        <Image
          source={{ uri: 'http://teragigame.ga/greenlight/food.jpg' }}
          style={{ width: '100%', height: '100%' }}
        />
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
        </ScrollView>
      </View>
    )
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
  buzzWords: {
    fontSize: 20,
    fontWeight:'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  overlayText: {
    paddingHorizontal: 20,
    marginTop: 135,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
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
