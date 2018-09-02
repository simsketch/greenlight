import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, Button, Icon, CheckBox, ListItem } from 'react-native-elements';

export class FindScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.titleBar}>Cuisine Screen</Text>
        <Text style={styles.headingText}>Select Cuisine</Text>
          <View style={styles.cuisine}>
            <Dropdown
            label='Current Locations'
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
            {/* <Dropdown
            label='Search Radius'
            data={distance}
            /> */}
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
  cuisine: {
    padding:40,
  },
  headingText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
});

let location = [
  //   {
  //   value: 'Current Location',
  // },
  {
    value: 'Delray Beach',
  },
  // {
  //   value: 'Boca Raton',
  // }, {
  //   value: 'Boynton Beach',
  // }, {
  //   value: 'Deerfield Beach',
  // }, {
  //   value: 'Pompano Beach',
  // }, {
  //   value: 'Lake Worth',
  // }, {
  //   value: 'Wellington',
  // }, {
  //   value: 'West Palm Beach',
  // }, {
  //   value: 'Jupiter',
  // }
  ];
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
  }, {
    value: 'Brazilian',
  }, {
    value: 'Greek',
  }, {
    value: 'Vegan',
  }];
  let distance = [{
    value: '5 miles',
  }, {
    value: '10 miles',
  }, {
    value: '20 miles',
  }];
  