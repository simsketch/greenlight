import React from 'react';
import { AppRegistry, View, ScrollView, Text, Image, TouchableHighlight, Platform, StyleSheet, FlatList, Share, Constants, Location, Permissions } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { WebBrowser, MapView, Video } from 'expo';
import TabBarIcon from '../components/TabBarIcon';
import { tintColor } from '../constants/Colors.js';
import { Hoshi } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
      videoURI: Expo.Asset.fromModule(require('../assets/videos/food.mp4')).uri,
      usernameInput: "Email Address",
      passwordInput: "Password",
      loginTitle: "Let\'s Eat",
  };
  welcomeMessage() {
      return (
        <Text style={styles.developmentModeText}>
        Find a table NOW!
      </Text>
      )
  }
  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Video
          source={{ uri: this.state.videoURI }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: '100%', height: '100%' }}
        />
        <ScrollView style={styles.overlay}>
          <View style={styles.overlayText}>
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
class LoginScreen extends React.Component {
  state = {
    rememberMeChecked: true
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleBar}>Login Screen</Text>
        <Hoshi
          label="Email Address"
          borderColor= { '#00e676' }
        />
        <Hoshi
          label="Password"
          borderColor= { '#00e676' }
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
          onPress={() => this.props.navigation.navigate('Find')}
        />
      </View>
    );
  }
}
class SignUpScreen extends React.Component {
  state = {
    termsChecked: true,
    newsChecked: true,
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleBar}>Sign Up Screen</Text>
        <Hoshi
          label="First Name"
          borderColor= { '#00e676' }
        />
        <Hoshi
          label="Last Name"
          borderColor= { '#00e676' }
        />
        <Hoshi
          label="Email Address"
          borderColor= { '#00e676' }
        />
        <Hoshi
          label="Password"
          borderColor= { '#00e676' }
        />
        <Hoshi
          label="Repeat Password"
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
      </View>
    );
  }
}

class FindScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.titleBar}>Cuisine Screen</Text>
        <Text style={styles.headingText}>Select Cuisine</Text>
          <View style={styles.cuisine}>
            <Dropdown
            label='Location'
            data={location}
            />
            <Dropdown
            label='Total # of Guests'
            data={guests}
            />
            <Dropdown
            label='Type of Cuisine'
            data={cuisine}
            />
            <Dropdown
            label='Search Radius'
            data={distance}
            />
            <Button
              title="Eat Now!"
              buttonStyle={{marginTop:50}}
              backgroundColor="#00E676"
              onPress={() => this.props.navigation.navigate('Vendor')}
            />
          </View>
      </View>
    );
  }
}
class VendorScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  pressRow(rowData) {
    this.props.navigation.navigate('Success', rowData);
    console.log(rowData);
  }
  render() {
    return (
      <ScrollView
      style={styles.container}
      >
        <Text style={styles.titleBar}>Please make a selection</Text>
        <Card containerStyle={{padding: 0}} >
          {
            vendors.map((v, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  onPress={()=>this.pressRow(v)}
                  underlayColor="#ddd"  
                >
                <ListItem
                  avatar={{  uri: v.image }}
                  avatarStyle={{ width:50, height: 50, marginRight:15 }}
                  containerStyle={{ alignContent: 'center' }}
                  badge={{ value: 'o', textStyle: { color: 'white' }, containerStyle: { backgroundColor: '#00E676', width:25 } }}
                  title={v.name}
                  subtitle={
                    <Text style={{marginHorizontal:10}}>Table for {v.capacity}</Text>
                  }
                /></TouchableHighlight>
                // <ListItem
                //   key={i}
                //   containerStyle={styles.listItem}
                //   title={u.name}
                //   subtitle={u.capacity}
                //   badge={{ value: 'o', textStyle: { color: 'white' }, containerStyle: { backgroundColor: '#00E676', width:25 } }}
                //   leftAvatar={{ source: {uri:u.image} }}
                // />
                // <ListItem
                //   key={i}
                //   roundAvatar
                //   title={u.name}
                //   featuredTitle={u.capacity}
                //   avatar={{uri:u.image}}
                // />
              );
            })
          }
        </Card>
          {/* <Card
            title='Chez Harry'
            image={require('../assets/images/food.jpg')}>
            <Text style={{marginBottom: 10}}>
              Best patty melts in town.
            </Text>
            <Button
              title="Select"
              onPress={() => this.props.navigation.navigate('Success')}
            />
          </Card> */}
      </ScrollView>
    );
  }
}
class SuccessScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    vendorCode: Math.floor(Math.random()*16777215).toString(16).toUpperCase()
  }
  _getDirections = () => {
    WebBrowser.openBrowserAsync('https://www.google.com/maps/dir//Sushi+Bon+Express+Inc,+304+E+Ocean+Ave,+Lantana,+FL+33462/@26.584162,-80.048381,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x88d8d9014646ca21:0xa6d2d255fb7d4b0d!2m2!1d-80.048381!2d26.584162');
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Video
          source={{ uri: Expo.Asset.fromModule(require('../assets/videos/food.mp4')).uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: '100%', height: '100%' }}
        />
        <View style={styles.overlay}>
          <View style={styles.overlayText}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>Present this code to the vendor.</Text>
          <Text style={{fontSize:48,fontWeight:'bold',textAlign:'center',backgroundColor:'#fff',width:'100%',marginTop:10}}>{this.state.vendorCode}</Text>
          <Button
            title="Get Directions"
            buttonStyle={{marginTop:50}}
            backgroundColor="#00E676"
            onPress={()=> this._getDirections()}
            />
            <Button
              title="View Map"
              buttonStyle={{marginTop:10}}
              backgroundColor="#39A675"
              onPress={() => this.props.navigation.navigate('Map')}
              />
            <Button
              title="Exit"
              buttonStyle={{marginTop:50}}
              backgroundColor="#32acc9"
              onPress={() => this.props.navigation.navigate('ThankYou')}
            />
          </View>
        </View>
      </View>
    );
  }
}

class MapScreen extends React.Component {
  render() {
    return (
      <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 26.584162,
        longitude: -80.048381,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
    );
  }
}
class ThankYouScreen extends React.Component {
  _shareDialog() {
    Share.share({
      message: 'Find a table NOW and save 10% with the Greenlight Dining app',
      url: 'http://greenlightdining.com',
      title: 'Eat NOW, and Save!'
    }, {
      // Android only:
      dialogTitle: 'Share Greenlight Dining app',
      // iOS only:
      // excludedActivityTypes: [
      //   'com.apple.UIKit.activity.PostToTwitter'
      // ]
    })
  }
  _leaveReview = () => {
    WebBrowser.openBrowserAsync('https://itunes.apple.com/us/app/greenlight-debit-card-for-kids/id1049340702?mt=8');
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={
            __DEV__
              ? require('../assets/images/logo-beta.png')
              : require('../assets/images/logo.png')
          }
          style={styles.thankyouImage}
        />
        <Text style={{fontSize:24, marginTop:200,textAlignVertical: "center",textAlign: "center" }}>Thank You for using{"\n"}Greenlight Dining!</Text>
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            <Button
              title="Leave a Review"
              buttonStyle={{width:'100%',marginTop:20}}
              backgroundColor="#00E676"
              onPress={() => this._leaveReview()}
            />
            <Button
              title="Start Over"
              buttonStyle={{width:'100%',marginTop:10}}
              backgroundColor="#39A675"
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button
              title="Share this App"
              buttonStyle={{width:'100%',marginTop:10}}
              backgroundColor="#32acc9"
              onPress={() => this._shareDialog()}
            />
          </View>
      </View>
    );
  }
}
class ReviewScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Leave a review (coming soon)</Text>
        <Button
          title="Start Over"
          buttonStyle={{width:'100%',marginTop:10}}
          backgroundColor="#39A675"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
let location = [{
  value: 'Current Location',
}, {
  value: 'Boca Raton',
}, {
  value: 'Delray Beach',
}, {
  value: 'Boynton Beach',
}, {
  value: 'Deerfield Beach',
}, {
  value: 'Pompano Beach',
}, {
  value: 'Lake Worth',
}, {
  value: 'Wellington',
}, {
  value: 'West Palm Beach',
}, {
  value: 'Jupiter, FL',
}];
let guests = [{
  value: '1',
}, {
  value: '2',
}, {
  value: '3',
}, {
  value: '4',
}, {
  value: '5',
}, {
  value: '6',
}, {
  value: '7',
}, {
  value: '8 or more',
}];
let cuisine = [{
  value: 'All',
}, {
  value: 'Italian',
}, {
  value: 'American',
}, {
  value: 'Mexican',
}, {
  value: 'Japanese',
}, {
  value: 'Thai',
}, {
  value: 'Chinese',
}, {
  value: 'Vietnamese',
}, {
  value: 'Sandwiches',
}, {
  value: 'Pizza',
}, {
  value: 'Breakfast',
}, {
  value: 'Steakhouse',
}, {
  value: 'Vegetarian',
}, {
  value: 'Seafood',
}, {
  value: 'Burgers',
}, {
  value: 'Sushi Bars',
}];
let distance = [{
  value: '5 miles',
}, {
  value: '10 miles',
}, {
  value: '20 miles',
}];
const vendors = [
  {
     vendorId: 1,
     name: 'Sushi Bon',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/pDu_ZdC4fiU-drKpjSP2Vw/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'John G\'s',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/WO0w7pgp90UduwW59MpXFQ/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Rocco\'s Tacos',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/NNJG28VaSlMrJjL2wzknkg/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Salt 7',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/J3VQ5DBUlITgo6ABFvgf4g/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'El Camino',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/N83yBzYgWz80tG8DvsHo3g/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Ramen Lab Eatery',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/6xAJAlYthJD8TtdH82uNew/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Vic & Angelo\'s',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/fquMkO2VtA681TDa-oz5Fw/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'City Oyster',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/mPe7CDlzflhSEiTRA08P7w/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Sazio',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Vwx34Nqjx256C8Sm3PGhMA/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Dada',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/WQoxIUX4upIrZjG1qAX3qQ/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'The Office',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/PUhkXhBonRkUntETEufA7g/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Cut 432',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/cbZYAPIh1VccrhOzu8hDwg/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'ROK:BRGR',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/FmgpdnBuuI-GqJ9UHoctFw/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Cabana El Rey',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/QoI1LzhJEdVyEYYvLGQsrA/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Mussel Beach',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/5RDlZ9s5GTgd8TR5UDuDdw/ls.jpg',
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
 ];
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
  welcomeImage: {
    width: 160,
    height: 160,
    alignSelf: 'center'
  },
  thankyouImage: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 50
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
  cuisine: {
    padding:40,
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

export default createStackNavigator(
  {
    Home: HomeScreen,
    Find: FindScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Vendor: VendorScreen,
    Success: SuccessScreen,
    Map: MapScreen,
    ThankYou: ThankYouScreen,
    Review: ReviewScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
