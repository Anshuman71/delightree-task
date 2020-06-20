import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import {NavigationConatiner} from '@react-navigation/native';
import {theme} from './utils/constants';
import MainStack from './navigation';
import ListItem from './components/ListItem';
import CreateAnnouncement from './screens/CreateAnnouncement';

function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <NavigationConatiner>
        <MainStack />
      </NavigationConatiner>
    </SafeAreaView>
  );
}

export default App;
