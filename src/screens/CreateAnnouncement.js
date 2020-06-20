import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import {theme, deviceHeight} from '../utils/constants';
import commonStyles from '../utils/styles';
import ListItem from '../components/ListItem';
import ExpandableGroup from '../components/ExpansionGroup';
import {users, teams} from '../utils/source';

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

function CreateAnnouncement() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [announcementName, setAnnouncementName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [canProceed, setProceed] = useState(false);

  useEffect(() => {
    const newGroups = [...teams];
    const nonMembers = [];
    users.forEach(user => {
      const {teamIds} = user;
      if (teamIds && Array.isArray(teamIds)) {
        teamIds.forEach(id => {
          const groupIndex = newGroups.findIndex(item => item.id === id);
          newGroups[groupIndex].members.push(user);
        });
      } else {
        nonMembers.push(user);
      }
    });
    setData([...newGroups, ...nonMembers]);
  }, []);

  useEffect(() => {
    setProceed(announcementName.length && true);
  }, [announcementName]);

  function handleAnnouncementNameChange(val) {
    setAnnouncementName(val);
  }

  function handleFilter(val) {
    const query = val && val.toLowerCase();
    if (query) {
      setFilteredData(
        users.filter(
          item => item.name && item.name.toLowerCase().includes(query),
        ),
      );
    } else {
      setFilteredData([]);
    }
  }

  function renderItem({item}) {
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
    return <ListItem data={item} />;
  }
  return (
    <View style={{flex: 1, padding: 24, paddingBottom: 0}}>
      <TextInput
        placeholderTextColor={theme.grey}
        placeholder="Announcement Name"
        onChangeText={handleAnnouncementNameChange}
        style={commonStyles.inputBox}
      />
      <TextInput
        placeholderTextColor={theme.grey}
        placeholder="Add people"
        onChangeText={handleFilter}
        style={{...commonStyles.inputBox, marginTop: 24}}
      />
      <Text style={styles.selectedCount}>31/1000</Text>
      <FlatList
        keyExtractor={keyExtractor}
        data={filteredData.length ? filteredData : data}
        renderItem={renderItem}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateAnnouncement;
