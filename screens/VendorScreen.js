import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  Platform,
  FlatList,
  RefreshControl,
  AsyncStorage,
  Image,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown';
import { Constants, Location, Permissions, WebBrowser } from 'expo';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

export class VendorScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    location: {coords:{latitude:null,longitude:null}},
    errorMessage: null,
    distanceUrl: "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=26.4614299,-80.0705547;26.5748954,-80.0777257&travelMode=driving&key=AtfrjzyT3EQQAuKMVr0h8OzC9m23-ApMCZMSwKBioRn_Go6vt6tRX-3osO8Pcm-E",
    vendors: [],
    refreshing: false,
  }
  // _retrieveVendors() {
  //   axios.get('https://greenlight.now.sh/api/vendors')
  //     // .then(response => this.setState({ vendors: response }))
  //     .then(function (response) {
  //       this.setState({ vendors: response.data });
  //       //alert(JSON.stringify(response));
  //       console.log(response);
  //     }.bind(this))
  //     .catch(function (error) {
  //       alert(error);
  //       console.log(error);
  //     });
  // }
  componentWillMount() {
      this._getLocationAsync();
    // if (Platform.OS === 'android' && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //   });
    //   alert('This emulator is not supported');
    // } else {
    // }
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
  componentDidMount() {
    Keyboard.dismiss();
    this.getVendors();
    this.timer = setInterval(()=> this.getVendors(), 3000);
    // let fetchVendors = this._retrieveVendors();
    // setInterval(function(fetchVendors) {
    //   fetchVendors();
    // }, 3000);
    // fetch('https://greenlight.now.sh/api/vendors')
    //   .then(response => console.log(response.json()))
    //   .then(data => console.log(this.setState({ vendors: data })));
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  signOut = (props) => {
      // AsyncStorage.setItem('emailAddress', '');
      // AsyncStorage.setItem('password', '');
      AsyncStorage.setItem('rememberMeChecked', 'true');
      firebase.auth().signOut().then(function() {
      props.navigation.navigate('Home');
      Alert.alert(
        'You have been logged out',
        'We\'ll see you next time you\'re hungry!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      // debugger;
      //withNavigation(HomeScreen);
    }).catch(function(error) {
      alert(error);
    });
  }
  getVendors = async () => {
    // this.setState({refreshing: true});
    fetch('https://app.greenlightdining.com/api/vendors', {method: "GET"})
     .then((response) => response.json())
     .then((responseData) =>
     {
      this.setState({ vendors: responseData });
      // this.setState({refreshing: false});
        // console.log(responseData);
     })
     .catch((error) => {
        console.log(error);
        //  this.setState({refreshing: false});
     });
   
   }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      alert('You must enable location services for full functionality.');
    } else {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    // console.table(location);
    }
  };
  saveOrder(rowData) {
    //alert(JSON.stringify(rowData));
    // axios.get('https://greenlight.now.sh/api/vendors')
    //   // .then(response => this.setState({ vendors: response }))
    //   .then(function (response) {
    //     this.setState({ vendors: response.data });
    //     //alert(JSON.stringify(response));
    //     console.log(response);
    //   }.bind(this))
    //   .catch(function (error) {
    //     alert(error);
    //     console.log(error);
    //   });
    let newEntry = {}
    newEntry.vendorId = rowData._id;
    newEntry.vendorName = rowData.name;
    newEntry.userId = this.props.navigation.getParam('email', 'testuser@greenlightdining.com')
    newEntry.numberOfGuests = rowData.guests;
    newEntry.capacity = rowData.capacity;
    newEntry.promoCode = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    newEntry.userLat = this.state.location.coords.latitude;
    newEntry.userLong = this.state.location.coords.longitude;
    newEntry.timestamp = new Date().getTime().toString();
    fetch('https://app.greenlightdining.com/api/orders', {
      method: 'post',
      body: JSON.stringify(newEntry),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(json => {
      // let data = this.state.vendors;
      // data.push(json);
      // this.setState({
      //   vendors: data
      // });
      this.props.navigation.navigate('Success', {
        promoCode: newEntry.promoCode,
        location: this.state.location.coords,
        vendorName: newEntry.vendorName,
        vendorId: newEntry.vendorId,
        numberOfGuests: newEntry.numberOfGuests,
        capacity: newEntry.capacity,
        timestamp: newEntry.timestamp
      }
      );
      //return newEntry;
    })
    .then(function(json) {
      console.log('Created a record: '+ JSON.stringify(json));
    })
    .catch;
  }

  rad(x) {
    return x * Math.PI / 180;
  }
  getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.lat - p1.lat);
    var dLong = this.rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // returns the distance in meter
    var f = d*3.28084; // distance in feet
    var m = Math.floor(f/5.28); // distance in feet
    m = m/1000;
    // return f+" feet"; 
    return m.toFixed(2); 
  }
  pressRow(rowData) {
    let p1 = {
      lat: this.state.location.coords.latitude,
      lng: this.state.location.coords.longitude
    }
    let p2 = {
      lat: rowData.lat,
      lng: rowData.long
    }
    let capArray = rowData.capacity.split(",");
    // if (capArray==0) {alert('No tables available');}
    if(capArray==0){
      Alert.alert(
        'There are no tables available presently',
        'Please select a restaurant with their green light on.',
        { cancelable: false }
      )
      return;
    }
    if(this.getDistance(p1,p2)>30){
      Alert.alert(
        'You are too far from the selected restaurant',
        'Please select a restaurant closer to your location.',
        { cancelable: false }
      )
      return;
    }
    // alert(capArray);
    capArray = [...new Set(capArray)];
    // alert(capArray);
    let newCapArray = [];
    for (let i=0;i<capArray.length;i++) {
      let guests = capArray[i];
      rowData.guests = guests;
      newCapArray.push({text: 'Table for '+ guests, onPress: () => this.saveOrder(rowData)});
    }
    let okCancel = [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      // {text: 'OK', onPress: () => this.props.navigation.navigate('Success', rowData)},
    ];
    if (Platform.OS === 'android') {
      okCancel.push({text: 'OK', onPress: () => this.props.navigation.navigate('Success', rowData)});
    }
    let newArray = newCapArray.concat(okCancel);
    Alert.alert(
      'Would you like to proceed and save 10%?',
      'Confirm the number of guests in your party.',
      newArray,
      { cancelable: false }
    )
    // alert("Confirm table?");
    //this.props.navigation.navigate('Success', rowData);
    console.log(rowData);
  }
  openLink() {
    WebBrowser.openBrowserAsync('https://www.budweiser.com/en/home.html');
  }
  render() {
    let text = 'Waiting...';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    const vendors = this.state.vendors;
    // alert(text);
    const cuisinePref = this.props.navigation.getParam('cuisineState', 'All');
    console.log(cuisinePref);
    // var vendorCount = 0;
    var localVendors = vendors.filter((v) => {
      let p1 = {
        lat: this.state.location.coords.latitude,
        lng: this.state.location.coords.longitude
      }
      let p2 = {
        lat: v.lat,
        lng: v.long
      }
      let d = this.getDistance(p1,p2);
      // console.log(d);
      // if(d<30) {
      //   vendorCount = vendorCount + 1;
      // }
      return d<30;
    })
    // console.log("localVendors: "+localVendors);
    if (localVendors == "") {
      return (
        <View style={styles.container}>
        <ScrollView
        style={styles.container}
        >
        <Text style={styles.titleBar}>Please make a selection</Text>
          <Card style={{padding: 0,width:'100%'}} >
          <TouchableHighlight
          onPress={()=>this.openLink()}>
          <Image
          source={{ uri: 'http://teragigame.ga/greenlight/bannerad.jpg' }}
          style={{ width: '100%', height: 50, marginBottom: 20 }}
          />
          </TouchableHighlight>
        <Text style={styles.infoMessage}>There are no Greenlight Dining partner restaurants available in your area at this time. Location services must be turned on in order to experience full functionality.{"\n"}{"\n"}Contact app@greenlightdining.com for more information</Text>
        </Card>
        <Button
            title="Logout"
            buttonStyle={{marginTop:0}}
            backgroundColor="#666"
            onPress={() => this.signOut(this.props)}
          />
        </ScrollView>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView
        style={styles.container}
        // refreshControl={
        //   <RefreshControl
        //     progressViewOffset={-90}
        //     title="Checking for available tables"
        //     refreshing={this.state.refreshing}
        //     onRefresh={this.getVendors}
        //   />
        // }
        >
          <Text style={styles.titleBar}>Please make a selection</Text>
          {/* <Text>{text}</Text> */}
      {/* <Dropdown
            label='Type of Cuisine'
            data={cuisine}
            /> */}
          <Card style={{padding: 0,width:'100%'}} >
          <TouchableHighlight
          onPress={()=>this.openLink()}>
          <Image
          source={{ uri: 'http://teragigame.ga/greenlight/bannerad.jpg' }}
          style={{ width: '100%', height: 50, marginBottom: 20 }}
          />
          </TouchableHighlight>
            {
              // .sort((a, b) => a.cuisine > b.cuisine)
              [].concat(vendors)
              .sort(function(a, b) {
                var ret = 0;
                if(a.name.toLowerCase() < b.name.toLowerCase()) ret = -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) ret = 1;
                if(a.capacity.length > b.capacity.length) ret = -1;
                if(a.capacity.length < b.capacity.length) ret = 1;
                return ret;
              })
              .filter((v) => {
                let p1 = {
                  lat: this.state.location.coords.latitude,
                  lng: this.state.location.coords.longitude
                }
                let p2 = {
                  lat: v.lat,
                  lng: v.long
                }
                let d = this.getDistance(p1,p2);
                // console.log(d);
                // if(d<30) {
                //   vendorCount = vendorCount + 1;
                // }
                return d<30;
              })
              .map((v, i) => {
                let lightOn = "#bbbbbb";
                let tablesAvailable = "No tables available";
                if(v.capacity != 0) {
                  lightOn = "#00E676";
                  tablesAvailable = "Table for "+v.capacity;
                }
                return (
                  <TouchableHighlight
                    key={i}
                    onPress={()=>this.pressRow(v)}
                    underlayColor="#ddd"  
                  >
                  <ListItem
                    avatar={{  uri: v.image }}
                    avatarStyle={{ width:60, height: 60, marginLeft:15 }}
                    containerStyle={{ alignContent: 'center' }}
                    badge={{ value: 'o', textStyle: { color: 'white' }, containerStyle: { backgroundColor: lightOn, width:25 } }}
                    title={v.name}
                    titleStyle={{marginLeft:40, whiteSpace: 'normal', fontSize: 12, fontWeight:'bold', color:'#00e676'}}
                    subtitle={
                      <Text style={{marginLeft:40,height:60,fontSize:12}}>
                      {tablesAvailable}{"\n"}{v.cuisine}{"\n"}{v.price}</Text>
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
          {/* { vendorCount > 0 && <Text>There are no Greenlight Dining partner restaurants available in your area at this time.</Text>} */}
          {/* <Text>If nothing is listed, there are no Greenlight Dining partner restaurants available in your area at this time.</Text> */}
          <Button
            title="Logout"
            buttonStyle={{marginTop:0}}
            backgroundColor="#666"
            onPress={() => this.signOut(this.props)}
          />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  titleBar: {
    backgroundColor: '#00e676',
    alignSelf: 'stretch',
    textAlign: 'center',
    color: '#fff',
    padding:20,
    paddingBottom:40,
    marginBottom:0,
    height:30,
  },
  advertisement: {
    backgroundColor: '#333',
    alignSelf: 'stretch',
    textAlign: 'center',
    color: '#fff',
    padding:20,
    paddingBottom:40,
    marginBottom:20,
    height:30,
  },
  infoMessage: {
    textAlign: 'center',
  },
});

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
}, {
  value: 'Brazilian',
}, {
  value: 'Greek',
}, {
  value: 'Vegan',
}];