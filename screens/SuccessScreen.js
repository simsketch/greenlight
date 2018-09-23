import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  AsyncStorage,
  CameraRoll
} from 'react-native';
import { WebBrowser, MapView, Video, Haptic } from 'expo';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';

export class SuccessScreen extends React.Component {
  static navigationOptions = {
    headerLeft: (
      <Text
        onPress={() => alert('This is a button!')}
        title="Cancel"
        color="#000"
      />
    ),
  };
  constructor(props) {
    super(props);
  }
  state = {
    cameraRollUri: null,
    location: this.props.navigation.getParam('location', 'no location set'),
    vendorName: this.props.navigation.getParam('vendorName', 'Restaurant X'),
    vendorId: this.props.navigation.getParam('vendorId', '0x012345'),
    numberOfGuests: this.props.navigation.getParam('numberOfGuests', '7'),
    capacity: this.props.navigation.getParam('capacity', '0'),
    promoCode: this.props.navigation.getParam('promoCode', 'PROMOCODE5'),
    timestamp: this.props.navigation.getParam('timestamp', '1450663457')
  }
  _getDirections = () => {
    // const url = 'https://www.google.com/maps/dir/@'+this.state.location.latitude+','+this.state.location.longitude+'/'+encodeURIComponent(this.state.vendorName);
    const url = 'https://www.google.com/maps/search/'+encodeURIComponent(this.state.vendorName);
    // alert(url);
    WebBrowser.openBrowserAsync(url);
  };
  componentDidMount() {
    this.updateCapacity();
    this._saveCode();
  }
  _saveCode = async () => {
      try {
        await
        AsyncStorage.setItem('promoCode', this.state.promoCode);
        AsyncStorage.setItem('timestamp', this.state.timestamp.toString());
      } catch (error) {
        alert('Save error: '+error);
      }
  }
  updateCapacity() {
    // const id = this.state.vendors[index]._id;
    // let capacity = document.getElementById('newCapacity-'+index).value;
    // if (capacity == "") {
    //   capacity = "0";
    // } else {
    //   capacity = capacity.split(",");
    // }
    const id = this.state.vendorId;
    const numberOfGuests = this.state.numberOfGuests;
    let capacity = this.state.capacity;
    // debugger;
    capacity = capacity.replace(numberOfGuests, "");
    if (capacity!="") {
      capacityArray = capacity.split(",").join('').split('');
      if (capacityArray.length >= 1) {
      capacity = capacity.split(",").join('').split('').join(",");
      } else {
        capacity = "";
      }
    } else {
      capacity = "0";
    }
    fetch(`http://app.greenlightdining.com/api/vendors/${id}/update/${capacity}`, { method: 'PUT' })
      .then(res => {
        // document.getElementById('capacity-'+index).innerHTML = capacity;
        console.log("Table capacity has been updated: "+capacity+"-"+numberOfGuests);
        // alert("Success! Capacity updated.");
        // window.location.reload();
        // return res.json();
        // this._modifyVendor(index, null);
      })
      .catch(err => {
        alert(err);
      });
  }
  // _saveToCameraRollAsync = async () => {
  //   let result = await takeSnapshotAsync(this._container, {
  //     format: 'png',
  //     result: 'file',
  //   });

  //   let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
  //   alert(JSON.stringify(saveResult));
  //   this.setState({ cameraRollUri: saveResult });
  // };
  _cancelTable = () => {
    const id = this.state.vendorId;
    // const numberOfGuests = this.state.numberOfGuests;
    let capacity = this.state.capacity;
    // capacity = capacity + "," + numberOfGuests;
    fetch(`http://app.greenlightdining.com/api/vendors/${id}/update/${capacity}`, { method: 'PUT' })
      .then(res => {
        // document.getElementById('capacity-'+index).innerHTML = capacity;
        console.log("Table capacity has been updated: "+capacity);
        // alert("Success! Capacity updated.");
        // window.location.reload();
        // return res.json();
        // this._modifyVendor(index, null);
      })
      .catch(err => {
        alert(err);
      });
    Alert.alert(
      'Cancel table?',
      'You are about to cancel your table. You won\'t be saving 10% if you cancel. Proceed??',
      [
        {text: 'Cancel', onPress: () => {

          console.log('Cancel Pressed');
        }, style: 'cancel'},
        {text: 'OK', onPress: () => this.props.navigation.navigate('Vendor')},
      ],
      { cancelable: false }
    )

    //alert("Cancel table?");
    //this.props.navigation.navigate('Vendor');
  };
  render() {
    Haptic.notification(Haptic.NotificationTypes.Success);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Video
          source={{ uri: "http://teragigame.ga/greenlight/food.mp4" }}
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
        <View style={styles.overlay}>
          <View style={styles.overlayText}>
          <Text style={{ fontSize:14, textAlign: 'center', color: '#fff', backgroundColor:'#333', padding:10 }}>
          Thank you for choosing the{"\n"}Greenlight Dining App.{"\n"}{"\n"}Your table and 10% discount{"\n"}are waiting for you.{"\n"}{"\n"}Please provide this confirmation code upon your arrival.{"\n"}{"\n"}This code is only valid for 15 minutes!</Text>
          <Text selectable style={{fontSize:48,fontWeight:'bold',textAlign:'center',backgroundColor:'#fff',width:'100%',marginTop:10}}>{this.state.promoCode}</Text>
          <Text style={{ marginTop:10, textAlign: 'center', color: '#fff' }}>
          EAT NOW!
          </Text>
          <Button
            title="Get Directions"
            buttonStyle={{marginTop:50}}
            backgroundColor="#00E676"
            onPress={()=> this._getDirections()}
            />
            <Button
              title="Cancel Reservation"
              buttonStyle={{marginTop:10}}
              backgroundColor="#e60046"
              onPress={()=> this._cancelTable()}
              />
              {/* {this.state.cameraRollUri &&
          <Image
            source={{ uri: this.state.cameraRollUri }}
            style={{ width: 200, height: 200 }}
          />}

        <Button title="Take Screenshot" onPress={this._saveToCameraRollAsync} /> */}
            {/* <Button
              title="View Map"
              buttonStyle={{marginTop:10}}
              backgroundColor="#39A675"
              onPress={() => this.props.navigation.navigate('Map')}
              /> */}
            <Button
              title="Exit"
              buttonStyle={{marginTop:10}}
              backgroundColor="#32acc9"
              onPress={() => this.props.navigation.navigate('ThankYou')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlayText: {
    paddingHorizontal: 20,
    marginTop: 85,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
