import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAnnounceMent from '../screens/CreateAnnouncement';
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Create Announcement" component={CreateAnnounceMent} />
      <Stack.Screen name="View Announcement" component={CreateAnnounceMent} />
    </Stack.Navigator>
  );
}

export default MainStack;
