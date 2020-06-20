import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {theme} from './utils/constants';
import MainStack from './navigation/index';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 0, backgroundColor: theme.primary}} />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
        <StatusBar barStyle="light-content" backgroundColor={theme.primary} />
        <MainStack />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
