import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from '../node_modules/react-native-app-intro-slider';
import AppNavigator from '../navigation/AppNavigator';

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  },
  logoImage: {
    width: 240,
    height: 160,
  },
  text: {
    color: '#666',
    textAlign: 'justify',
  },
  title: {
    color: '#666',
    textAlign: 'center',
  }
});

const slides = [
  {
    key: 'slide-one',
    title: 'Welcome to\nGreenlight Dining\n\nEat NOW!',
    titleStyle: styles.title,
    text: 'Find available tables in your area AND receive a discount for getting the Greenlight™.\n\nYou can filter your options by cuisine, distance, and number of guests in your party.',
    textStyle: styles.text,
    image: require('../assets/images/slide-tables.png'),
    imageStyle: styles.image,
    backgroundColor: '#FFF',
  },
  {
    key: 'slide-two',
    title: 'How it Works',
    titleStyle: styles.title,
    text: 'When a restaurant turns their Greenlight™ on, you can claim the table immediately!\n\nNever wait for a table, make a reservation, or pay full price ever again!',
    textStyle: styles.text,
    image: require('../assets/images/slide-diners.png'),
    imageStyle: styles.image,
    backgroundColor: '#FFF',
  },
  {
    key: 'slide-three',
    title: 'Enjoy life!',
    titleStyle: styles.title,
    text: 'Relax knowing you\'ll never have to worry about finding a place to eat.\n\nYou get a discount, immediate seating and the restaurant gets a new customer. Everybody wins!',
    textStyle: styles.text,
    image: require('../assets/images/slide-relax.png'),
    imageStyle: styles.image,
    backgroundColor: '#FFF',
  }
];

export default class IntroScreen extends React.Component {
  state = {
    showRealApp: false
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(0, 0, 0, .5)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(0, 0, 0, .5)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return <AppNavigator/>;
    } else {
      return (
        <AppIntroSlider
        slides={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this._onDone}
        />
      );
      // return <AppNavigator/>;
    }
  }
}