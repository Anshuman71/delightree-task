import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {theme} from './utils/constants';
import MainStack from './navigation/index';
import ListItem from './components/ListItem';
import CreateAnnouncement from './screens/CreateAnnouncement';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
        <StatusBar barStyle="light-content" backgroundColor={theme.primary} />
        <MainStack />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
