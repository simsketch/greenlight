import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native';
import { WebBrowser, MapView, Video, Haptic, takeSnapshotAsync } from 'expo';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';

export class SuccessScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    vendorCode: Math.floor(Math.random()*16777215).toString(16).toUpperCase(),
    cameraRollUri: null,
  }
  _getDirections = () => {
    WebBrowser.openBrowserAsync('https://www.google.com/maps/dir//Sushi+Bon+Express+Inc,+304+E+Ocean+Ave,+Lantana,+FL+33462/@26.584162,-80.048381,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x88d8d9014646ca21:0xa6d2d255fb7d4b0d!2m2!1d-80.048381!2d26.584162');
  };
  _saveToCameraRollAsync = async () => {
    let result = await takeSnapshotAsync(this._container, {
      format: 'png',
      result: 'file',
    });

    let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    this.setState({ cameraRollUri: saveResult });
  };
  _cancelTable = () => {
    Alert.alert(
      'Cancel table?',
      'You are about to cancel your table. You won\'t be saving 10% if you cancel. Proceed??',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
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
          <Text style={{ textAlign: 'center', color: '#fff', backgroundColor:'#333', padding:10 }}>
          Thank you for choosing the GreenLight Dining App.{"\n"}Your table and 10% discount are waiting for you.{"\n"}Please provide this confirmation code upon your arrival. </Text>
          <Text selectable style={{fontSize:48,fontWeight:'bold',textAlign:'center',backgroundColor:'#fff',width:'100%',marginTop:10}}>{this.state.vendorCode}</Text>
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
              {this.state.cameraRollUri &&
          <Image
            source={{ uri: this.state.cameraRollUri }}
            style={{ width: 200, height: 200 }}
          />}

        <Button title="Take Screenshot" onPress={this._saveToCameraRollAsync} />
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
    marginTop: 235,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
