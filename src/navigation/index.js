import React from 'react';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import CreateAnnounceMent from '../screens/CreateAnnouncement';
import ViewAnnouncement from '../screens/ViewAnnouncement';
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
      options={{
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}
      headerMode="none">
      <Stack.Screen name="Create Announcement" component={CreateAnnounceMent} />
      <Stack.Screen name="ViewTask" component={ViewAnnouncement} />
    </Stack.Navigator>
  );
}

export default MainStack;
