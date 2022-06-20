import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, SymptomsExpand } from '../screens';
import { ScreenName } from '../../api/common';

const Stack = createStackNavigator();

const HomeNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ScreenName.home}
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={ScreenName.symptomsExpand}
      component={SymptomsExpand}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigation;
