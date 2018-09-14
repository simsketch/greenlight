import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  Platform,
  FlatList, RefreshControl
} from 'react-native';
import axios from 'axios';
import { Constants, Location, Permissions } from 'expo';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';

export class VendorScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    location: null,
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
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  componentDidMount() {
    this.getVendors();
    this.timer = setInterval(()=> this.getVendors(), 3000)
    // let fetchVendors = this._retrieveVendors();
    // setInterval(function(fetchVendors) {
    //   fetchVendors();
    // }, 3000);
    // fetch('https://greenlight.now.sh/api/vendors')
    //   .then(response => console.log(response.json()))
    //   .then(data => console.log(this.setState({ vendors: data })));
  }
  getVendors = async () => {
    // this.setState({refreshing: true});
    fetch('https://greenlight.now.sh/api/vendors', {method: "GET"})
     .then((response) => response.json())
     .then((responseData) =>
     {
      this.setState({ vendors: responseData });
      // this.setState({refreshing: false});
        console.log(responseData);
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
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
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
    newEntry.userId = "testuser@greenlightdining.com";
    newEntry.numberOfGuests = rowData.guests;
    newEntry.promoCode = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    newEntry.userLat = this.state.location.coords.latitude;
    newEntry.userLong = this.state.location.coords.longitude;
    newEntry.timestamp = this.state.location.timestamp;
    fetch('https://greenlight.now.sh/api/orders', {
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
        promoCode: newEntry.promoCode}
      );
      //return newEntry;
    })
    .then(function(json) {
      console.log('Created a record: '+ JSON.stringify(json));
    })
    .catch;
  }
  pressRow(rowData) {
    let capArray = rowData.capacity.split(",");
    if (capArray==0) {return;}
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
  render() {
    let text = 'Waiting...';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    const vendors = this.state.vendors;
    // alert(text);
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
          <Card style={{padding: 0,width:'100%'}} >
            {
              vendors.map((v, i) => {
                let lightOn = "#bbbbbb";
                if(v.capacity != 0) {
                  lightOn = "#00E676";
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
                    titleStyle={{marginLeft:40}}
                    subtitle={
                      <Text style={{marginLeft:40,height:60,fontSize:12}}>Table for {v.capacity}{"\n"}{v.cuisine}{"\n"}{v.price}</Text>
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
});