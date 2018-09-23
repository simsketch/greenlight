import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Share
} from 'react-native';
import { StoreReview, WebBrowser } from 'expo';
import { Button } from 'react-native-elements';

export class ThankYouScreen extends React.Component {
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
    if(Platform.OS === 'ios') {
      WebBrowser.openBrowserAsync('https://itunes.apple.com/us/app/greenlight-dining/id1424448305');
    } else {
      WebBrowser.openBrowserAsync('https://play.google.com/store/apps/details?id=com.a2zCreative.greenlight');
    }
  };
  render() {
    if(StoreReview.isSupported()) {
      StoreReview.requestReview();
    }
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
        <Text style={{fontSize:24, marginTop:20,textAlignVertical: "center",textAlign: "center" }}>Thank You for using{"\n"}Greenlight Dining!</Text>
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start' }}>
            <Button
              title="Leave a Review"
              buttonStyle={{width:'100%',marginTop:20}}
              backgroundColor="#00E676"
              onPress={() => this._leaveReview()}
            />
            <Button
              title="Share this App"
              buttonStyle={{width:'100%',marginTop:10}}
              backgroundColor="#32acc9"
              onPress={() => this._shareDialog()}
            />
            <Button
              title="Exit"
              buttonStyle={{width:'100%',marginTop:10}}
              backgroundColor="#39A675"
              onPress={() => this.props.navigation.navigate('Home')}
            />
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
  thankyouImage: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 50
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
