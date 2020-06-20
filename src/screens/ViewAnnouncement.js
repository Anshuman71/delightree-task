import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {theme} from '../utils/constants';
import ListItem from '../components/ListItem';
import ExpandableGroup from '../components/ExpansionGroup';
import Header from '../components/Header';

const styles = StyleSheet.create({
  selectedCount: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 24,
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {fontSize: 20, color: theme.background},
});

function keyExtractor(item) {
  return `${item.id}${item.name}`;
}

function ViewAnnouncement({route, navigation}) {
  function renderItem({item, index}) {
    if (item.members && item.members.length) {
      return (
        <ExpandableGroup main={item}>
          <FlatList
            keyExtractor={keyExtractor}
            data={item.members}
            renderItem={renderItem}
          />
        </ExpandableGroup>
      );
    }
    return <ListItem data={item} handleUpdate={() => null} />;
  }
  return (
    <View style={{flex: 1}}>
      <Header
        title={route.params.title}
        subtitle={`${route.params.data.length} members`}
      />
      <View style={{flex: 1, padding: 24, paddingBottom: 0}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={route.params.data}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

export default ViewAnnouncement;
