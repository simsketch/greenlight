import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import { StoreReview, WebBrowser } from 'expo';

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
    WebBrowser.openBrowserAsync('https://play.google.com/store/apps/details?id=com.a2zCreative.greenlight');
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
});
