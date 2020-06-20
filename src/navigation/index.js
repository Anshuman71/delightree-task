import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAnnounceMent from '../screens/CreateAnnouncement';
import Header from '../components/Header';
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        header: ({scene, previous, navigation}) => {
          const {options} = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Header
              title={title}
              subtitle={title}
              style={options.headerStyle}
            />
          );
        },
      }}>
      <Stack.Screen name="Create Announcement" component={CreateAnnounceMent} />
      <Stack.Screen name="View Announcement" component={CreateAnnounceMent} />
    </Stack.Navigator>
  );
}

export default MainStack;
