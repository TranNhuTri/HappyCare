import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatLobby, SearchDoctor } from '../screens';
import { ScreenName } from '../../api/common';

const Stack = createStackNavigator();

const ChatNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ScreenName.chatLobby}
      component={ChatLobby}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={ScreenName.searchDoctor}
      component={SearchDoctor}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default ChatNavigation;
