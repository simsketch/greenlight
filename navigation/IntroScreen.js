import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
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
    text: 'Restaurants have available tables NOW and you want to EAT NOW as well as SAVE 10% off the entire check.\n\nYou can filter options such as cuisine, number of guests, and how far to travel.',
    textStyle: styles.text,
    image: require('../assets/images/slide-tables.png'),
    imageStyle: styles.image,
    backgroundColor: '#caffe5',
  },
  {
    key: 'slide-two',
    title: 'How it Works',
    titleStyle: styles.title,
    text: 'When a restaurant turns their Greenlight™ on, you can claim the table immediately!\n\nNever wait for a table, make a reservation, or pay full price ever again!',
    textStyle: styles.text,
    image: require('../assets/images/slide-diners.png'),
    imageStyle: styles.image,
    backgroundColor: '#caffe5',
  },
  {
    key: 'slide-three',
    title: 'EAT NOW!\nSave 10%',
    titleStyle: styles.title,
    text: 'Relax knowing you\'ll never have to worry about finding a place to eat.\n\nYou get a discount, immediate seating and the restaurant gets a new customer. Everybody wins!',
    textStyle: styles.text,
    image: require('../assets/images/slide-relax.png'),
    imageStyle: styles.image,
    backgroundColor: '#caffe5',
  }
];

export default class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    // const viewed = retrieveItem('viewedIntroSlider');
  }
  state = {
    showRealApp: false,
    viewedIntro: false
  }
  componentWillMount() {
    const key = "viewedIntroSlider";
    this.retrieveItem(key).then(status => {
      this.setState({ isChecked: status === true });
    })
  }
  retrieveItem = async (key) => {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
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
  _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-back"
          color="rgba(0, 0, 0, .5)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-redo"
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
  _onDone = async () => {
    // try {
    //   await AsyncStorage.setItem('viewedIntroSlider', 'true');
    // } catch (error) {
    //   alert("error saving viewedIntroSlider boolean");
    // }
    this.setState({ showRealApp: true })
  }
  render() {
    // alert(JSON.stringify(AsyncStorage.getAllKeys()));
    // alert(this.state.viewedIntroSlider);
    if (this.state.showRealApp || this.state.viewedIntroSlider == 'true') {
      return <AppNavigator/>;
    } else {
      // return (
      //   <AppIntroSlider
      //   slides={slides}
      //   renderDoneButton={this._renderDoneButton}
      //   renderNextButton={this._renderNextButton}
      //   renderPrevButton={this._renderPrevButton}
      //   renderSkipButton={this._renderSkipButton}
      //   onDone={this._onDone}
      //   onSkip={this._onDone}
      //   showSkipButton={true}
      //   showPrevButton={true}
      //   />
      // );
      return <AppNavigator/>;
    }
  }
}