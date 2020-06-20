import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ListItem from '../components/ListItem';
import ExpandableGroup from '../components/ExpansionGroup';
import Header from '../components/Header';

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  listContainer: {flex: 1, padding: 24, paddingBottom: 0},
});

function keyExtractor(item) {
  return `${item.id}${item.name}`;
}

function ViewAnnouncement({route}) {
  const {title, selectedCount, teamMap, teamMemberMap} = route.params;

  const renderItem = ({item}) => {
    const members =
      item.members &&
      teamMemberMap[item.id] &&
      Object.values(teamMemberMap[item.id]);

    if (item.id === 'UNGROUPED') {
      return (
        <FlatList
          keyExtractor={keyExtractor}
          data={members}
          renderItem={renderItem}
        />
      );
    }

    if (members && members.length) {
      return (
        <ExpandableGroup main={{...item, members}}>
          <FlatList
            keyExtractor={keyExtractor}
            data={members}
            renderItem={renderItem}
          />
        </ExpandableGroup>
      );
    }
    if (item.role) {
      return <ListItem onlineIcon data={item} handleUpdate={() => null} />;
    }
    return null;
  };

  return (
    <View style={styles.mainContainer}>
      <Header title={title} subtitle={`${selectedCount} members`} />
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={keyExtractor}
          data={Object.values(teamMap)}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

export default ViewAnnouncement;
