import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAnnounceMent from '../screens/CreateAnnouncement';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={CreateAnnounceMent} />
      <Stack.Screen name="Check" component={CreateAnnounceMent} />
    </Stack.Navigator>
  );
}

export default MainStack;
