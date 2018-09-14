import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';

const AuthStack = createStackNavigator({ Auth: AuthScreen });

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: AuthStack,
  Main: MainTabNavigator,
},{
  initialRouteName: 'Main',
});