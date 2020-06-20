import React from 'react';

import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {deviceWidth, theme} from '../utils/constants';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth,
    paddingVertical: 10,
  },
  avatar: {
    width: deviceWidth * 0.1,
    height: deviceWidth * 0.1,
    borderRadius: deviceWidth * 0.05,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: theme.black,
    letterSpacing: 1,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: theme.grey,
  },
  textContent: {width: '65%'},
  downArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.primary,
  },
  upArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.primary,
  },
  arrowButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
  },
  selectedIcon: {
    position: 'absolute',
    right: 2,
    bottom: 0,
    width: 15,
    height: 15,
  },
});

function ListItem({data, isGroup, onExpand, isOpen, handleUpdate}) {
  const subtitle = data.role || `${data.members.length} Members`;
  return (
    <TouchableOpacity
      onPress={isGroup ? () => null : () => handleUpdate()}
      activeOpacity={isGroup ? 1 : 0.8}
      style={styles.listItem}>
      <View>
        <Image
          style={styles.avatar}
          source={{
            uri: data.thumbnail,
          }}
        />
        {data.selected && (
          <Image
            source={require('../assets/selected.png')}
            style={styles.selectedIcon}
          />
        )}
      </View>
      <View style={styles.textContent}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {isGroup && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onExpand}
          style={styles.arrowButton}>
          <View style={isOpen ? styles.downArrow : styles.upArrow} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default ListItem;
