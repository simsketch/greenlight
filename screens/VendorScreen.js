import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  Platform,
  FlatList
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
    vendors: []
  }
  componentWillMount() {
    axios.get('https://greenlight.now.sh/api/vendors')
      // .then(response => this.setState({ vendors: response }))
      .then(function (response) {
        this.setState({ vendors: response.data });
        //alert(JSON.stringify(response));
        console.log(response);
      }.bind(this))
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  componentDidMount() {
    // fetch('https://greenlight.now.sh/api/vendors')
    //   .then(response => console.log(response.json()))
    //   .then(data => console.log(this.setState({ vendors: data })));
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
    newEntry.vendorId = rowData.vendorId;
    newEntry.userId = "testuser@greenlightdining.com";
    newEntry.numberOfGuests = rowData.guests;
    newEntry.vendorCode = "PROMOCODE5";
    newEntry.userLat = this.state.location.latitude;
    newEntry.userLong = this.state.location.longitude;
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
      this.props.navigation.navigate('Success',json);
      //return newEntry;
    })
    .then(function(json) {
      console.log('Created a record: '+ JSON.stringify(json));
    })
    .catch;
  }
  pressRow(rowData) {
    let capArray = rowData.capacity.split(",");
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
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    const vendors = this.state.vendors;
    // console.log(text);
    return (
      <View style={styles.container}>
        <ScrollView
        style={styles.container}
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
    marginBottom:40,
    height:30,
  },
});
const vendorsStatic = [
  {
     vendorId: 1,
     name: 'Sushi Bon',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/pDu_ZdC4fiU-drKpjSP2Vw/ls.jpg',
     website: 'www.sushibon.com',
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
     website: 'roccostacos.com',
     price: "$$",
     cuisine: 'Mexican',
     currentBalance: 0,
     phone: 5618081100,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Salt 7',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/J3VQ5DBUlITgo6ABFvgf4g/ls.jpg',
     website: 'salt7.com',
     price: "$$$",
     cuisine: 'American',
     currentBalance: 0,
     phone: 5612747258,
     available: true,
     capacity: 2,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'El Camino',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/N83yBzYgWz80tG8DvsHo3g/ls.jpg',
     website: 'elcaminodelray.com',
     price: "$$",
     cuisine: 'Latin',
     currentBalance: 0,
     phone: 5618655350,
     available: true,
     capacity: 1,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Ramen Lab Eatery',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/6xAJAlYthJD8TtdH82uNew/ls.jpg',
     website: 'ramenlabeatery.com',
     price: "$$",
     cuisine: 'Ramen, Asian Fusion',
     currentBalance: 0,
     phone: 5614552311,
     available: true,
     capacity: 8,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Vic & Angelo\'s',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/fquMkO2VtA681TDa-oz5Fw/ls.jpg',
     website: 'vicandangelos.com',
     price: "$$",
     cuisine: 'Italian',
     currentBalance: 0,
     phone: 5612789570,
     available: true,
     capacity: 4,
     lat:26.4614299,
     long:-80.0705547
  },
  {
     vendorId: 1,
     name: 'City Oyster',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/mPe7CDlzflhSEiTRA08P7w/ls.jpg',
     website: 'cityoysterdelray.com',
     price: "$$",
     cuisine: 'Seafood',
     currentBalance: 0,
     phone: 5612720220,
     available: true,
     capacity: 4,
     lat:26.461929,
     long:-80.07066
  },
  {
     vendorId: 1,
     name: 'Sazio',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Vwx34Nqjx256C8Sm3PGhMA/ls.jpg',
     website: 'sazio.com',
     price: "$",
     cuisine: 'Italian',
     currentBalance: 0,
     phone: 5612725540,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Dada',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/WQoxIUX4upIrZjG1qAX3qQ/ls.jpg',
     website: 'dadadelray.com',
     price: "$$",
     cuisine: 'Italian',
     currentBalance: 0,
     phone: 5613303232,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'The Office',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/PUhkXhBonRkUntETEufA7g/ls.jpg',
     website: 'theofficedelray.com',
     price: "$",
     cuisine: 'Gastropubs, American, Burgers',
     currentBalance: 0,
     phone: 5612763600,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Cut 432',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/cbZYAPIh1VccrhOzu8hDwg/ls.jpg',
     website: 'cut432.com',
     price: "$$$$",
     cuisine: 'Steakhouse, Seafood',
     currentBalance: 0,
     phone: 5612729898,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'ROK:BRGR',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/FmgpdnBuuI-GqJ9UHoctFw/ls.jpg',
     website: 'rokbrgr.com',
     price: "$$",
     cuisine: 'Italian',
     currentBalance: 0,
     phone: 5618087220,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Cabana El Rey',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/QoI1LzhJEdVyEYYvLGQsrA/ls.jpg',
     website: 'cabanarestaurant.com',
     price: "$$",
     cuisine: 'Cuban',
     currentBalance: 0,
     phone: 5612749090,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Mussel Beach',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/5RDlZ9s5GTgd8TR5UDuDdw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Seafood',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Death or Glory Bar',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/OQrijMIehha4OoWCuD6waQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Cocktail Bar, Comfort Food, Tiki Bar',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Beg For More Izakaya',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/oLdNDt9AOqedWEDCzxYUPA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Japanese, Tapas Bars, Cocktail Bars',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Colombian Coffee House',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/X5Ke5e5Tz--sHZiY-p-PqQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$",
     cuisine: 'Colombian, Coffee & Tea, Breakfast & Brunch',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Park Tavern',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/2B3WbJTHM8dVb654YaHWbQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'American, Bars',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'The Grove',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/F1X96RE8irZujFkTS9hKmw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'Seafood',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'The Foxworth Fountain',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/ohW6BdPhJfongbou80LtGA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Coffee & Tea, Breakfast & Brunch, Ice Cream & Frozen Yogurt',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Mussel Beach',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/5RDlZ9s5GTgd8TR5UDuDdw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Seafood',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'La Poulette',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/URoCsEP_nYE7OlN7v_scYQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'French, Wine Bars',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Farmhouse Kitchen',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/EadNYftIUq1eMMg4eU_e4Q/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Bars, Breakfast & Brunch, American',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Lemongrass Asian Bistro',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/8-DQjVi_OFdtdJCob2IZ5w/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Asian Fusion, Sushi Bars, Thai',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Racks Fish House & Oyster Bar',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/mxsC2cVYHK8k0BzBKQhACA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Seafood',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Osteria Salina',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/YtzFE-f_pn_QsbnnOPqRRw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Sicilian',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Che!!! Restaurant',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/8oiXJbUSDavSIUv3yFTk6Q/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Seafood',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Le Sorelle Restaurant',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/84HhI9G3xXhmjB5b7Zj9FQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Italian, Pizza, Cocktail Bars',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'The New Vegan',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/tbC0ou6TQldUq5MGAL3vWw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Vegan',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Sundy House Inn',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/tO_5xEgiakmUD3lf5HMsaQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Hotels, American (New), Venues & Event Spaces',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Prime',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/krCTOO_KkCUN4gDk2pD4Pw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Seafood, Steakhouses, Italian',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Ocean One Bar & Grille',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/q1loH-yAtoC-L9zb4j9sHg/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Seafood',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Taverna Opa',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/lYukaoXrkmPc2pU2b_fV3g/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Greek',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Tramonti',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/1kXx1RsK1kCTjHFd0vABlw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Italian',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Mellow Mushroom',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/NCh-o-EvjLrynhJJ-UbISg/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Pizza, Sandwiches, Bars',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Johnnie Brown’s',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/F6ghhh-NoDgxVLMe2AlWwA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'American (Traditional), Music Venues',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Olio',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/QZUtoX5HKYxKwu7BkMvhOQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'Italian, Mediterranean',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Buddha Sky Bar',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/UuVFzYy2gOAHQt2XqHe0yw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'Italian, Mediterranean',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Atlantic Grille',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/n_svj2Lg9dDc6Z83Xsq8eQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'Seafood, Bars',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'La Cigale',
     image: 'https://s3-media4.fl.yelpcdn.com/bphoto/GMCTHOZhdp9-QWu9BeTWuA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'Mediterranean, Salad, Soup',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Senor Burrito',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/qtNnaLPtrIpOxM2Iq_70tg/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'Mexican',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Bru\'s Room Sports Grill',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/A1GJ_s2n38QaXvb-rU89CQ/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Sports Bars, American (New), Sandwiches',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Corner Porch',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/7AlIuEIasSlu14xc_7aJYA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'American (New), Cocktail Bars, Breakfast & Brunch',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Deck 84',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/c72k9l9Xd6kG_ELJ2seAtA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'American (New)',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Bamboo Fire Cafe',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/j60vb4hw2wGBZz8uO7ZBKw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Caribbean, Cafes',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Green Owl Restaurant',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/TXcWC0MCDCv5HgDuEWtVew/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$",
     cuisine: 'Breakfast & Brunch',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Whole Green Cafe',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/4Ij6nu5ZuIeA2knQfRk6MA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'Cafes, Salad, Juice Bars & Smoothies',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'J&J Seafood Bar & Grill',
     image: 'https://s3-media2.fl.yelpcdn.com/bphoto/jDronFpN-v-ePxijVMqwMA/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'Seafood, American (New), Wine Bars',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Over the Bridge Cafe',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/5WdZTHKo5L_CyH8TS_wn9g/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Breakfast & Brunch, American (Traditional), Cafes',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: '50 Ocean',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/JtLgjIFEPqw38jTqn1H00Q/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Seafood, American (New), Beer, Wine & Spirits',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Boston\'s on the Beach',
     image: 'https://s3-media1.fl.yelpcdn.com/bphoto/2URWSr-Tgs4pRKD4aOYmkA/60s.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Seafood, American (New), Beer, Wine & Spirits',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Fifth Avenue Grill',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/t-btJ315hCH9jY_XFfrrHw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$",
     cuisine: 'Steakhouses, Seafood, Burgers',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
  {
     vendorId: 1,
     name: 'Cafe Boulud',
     image: 'https://s3-media3.fl.yelpcdn.com/bphoto/M3BLzMata-KUB7IPtGBaPw/ls.jpg',
     website: 'musselbeachrestaurant.com',
     price: "$$$",
     cuisine: 'French, American (New)',
     currentBalance: 0,
     phone: 5619216464,
     available: true,
     capacity: 4,
     lat:26.584162,
     long:-80.048381
  },
 ];