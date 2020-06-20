import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '../utils/constants';

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.primary,
  },
  button: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    width: 25,
    height: 25,
  },
});

function Header({title, subtitle}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.button}>
        <Image
          style={styles.icon}
          source={require('../assets/chevron_left.png')}
        />
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{fontSize: 20, fontWeight: '700', color: theme.background}}>
          {title}
        </Text>
        <Text
          style={{fontSize: 16, fontWeight: '500', color: theme.background}}>
          {subtitle}
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Image style={styles.icon} source={require('../assets/more.png')} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
