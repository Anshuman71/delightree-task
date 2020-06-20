import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {theme} from '../utils/constants';
import commonStyles from '../utils/styles';
import ListItem from '../components/ListItem';
import ExpandableGroup from '../components/ExpansionGroup';
import Header from '../components/Header';
import {users, teams} from '../utils/data';

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
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
  clearInput: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  clearIcon: {height: 24, width: 24},
  listContainer: {flex: 1},
  container: {flex: 1, padding: 24, paddingBottom: 0},
  memberInputContainer: {marginTop: 24},
});

function keyExtractor(item) {
  return `${item.id}`;
}

function CreateAnnouncement({route, navigation}) {
  const [teamMap, setTeamMap] = useState({});
  const [teamMemberMap, setTeamMemberMap] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [announcementName, setAnnouncementName] = useState('');
  const [canProceed, setProceed] = useState(false);

  useEffect(() => {
    const teamMembers = {UNGROUPED: {}};
    const members = {};
    users.forEach(user => {
      const {teamIds} = user;
      if (teamIds) {
        teamIds.forEach(teamId => {
          if (teamMembers[teamId]) {
            teamMembers[teamId] = {...teamMembers[teamId], [user.id]: user};
          } else {
            teamMembers[teamId] = {[user.id]: user};
          }
        });
      } else {
        teamMembers.UNGROUPED = {...teamMembers.UNGROUPED, [user.id]: user};
      }

      members[user.id] = user;
    });

    const map = {};
    teams.forEach(team => {
      map[team.id] = {...team};
    });

    setTeamMemberMap(teamMembers);
    setTeamMap(map);
  }, []);

  useEffect(() => {
    setProceed(announcementName.length && selectedCount);
  }, [announcementName, selectedCount]);

  const handleAnnouncementNameChange = value => {
    setAnnouncementName(value);
  };

  const handleFilter = value => {
    const query = value && value.toLowerCase();
    if (query) {
      setSearch(query);
      setFilteredData(
        users.filter(
          item => item.name && item.name.toLowerCase().includes(query),
        ),
      );
    } else {
      setSearch('');
      setFilteredData([]);
    }
  };

  const onClear = () => {
    setSearch('');
    setFilteredData([]);
  };

  const toggleSelect = ({member}) => {
    const newTeamMemberMap = {...teamMemberMap};
    if (member.teamIds) {
      member.teamIds.forEach(id => {
        newTeamMemberMap[id] = {
          ...newTeamMemberMap[id],
          [member.id]: {
            ...member,
            selected: !member.selected,
          },
        };
      });
    } else {
      newTeamMemberMap.UNGROUPED = {
        ...newTeamMemberMap.UNGROUPED,
        [member.id]: {
          ...member,
          selected: !member.selected,
        },
      };
    }
    setTeamMemberMap(newTeamMemberMap);
    // Update count
    setSelectedCount(member.selected ? selectedCount - 1 : selectedCount + 1);
  };

  const renderItem = ({item, index}) => {
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
    return (
      <ListItem data={item} handleUpdate={() => toggleSelect({member: item})} />
    );
  };

  const renderUserItem = ({item: user}) => {
    const {teamIds} = user;
    const member = teamMemberMap[teamIds ? teamIds[0] : 'UNGROUPED'][user.id];

    return (
      <ListItem
        data={member}
        handleUpdate={() => toggleSelect({member: member})}
      />
    );
  };

  const handleNext = () => {
    const selectedTeamMemberMap = {};

    Object.keys(teamMemberMap).forEach(teamId => {
      selectedTeamMemberMap[teamId] = {};

      const membersMap = teamMemberMap[teamId];
      Object.values(membersMap).forEach(member => {
        if (member.selected) {
          selectedTeamMemberMap[teamId][member.id] = {...member};
        }
      });
    });

    navigation.navigate('ViewTask', {
      title: announcementName,
      teamMemberMap: selectedTeamMemberMap,
      teamMap: teamMap,
      selectedCount: selectedCount,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Header title={route.name} />
      <View style={styles.container}>
        <TextInput
          placeholderTextColor={theme.grey}
          placeholder="Announcement Name"
          onChangeText={handleAnnouncementNameChange}
          style={commonStyles.inputBox}
        />
        <View style={styles.memberInputContainer}>
          <TextInput
            placeholderTextColor={theme.grey}
            placeholder="Add people"
            value={search}
            onChangeText={handleFilter}
            style={{...commonStyles.inputBox}}
          />
          {!!search && (
            <TouchableOpacity onPress={onClear} style={styles.clearInput}>
              <Image
                style={styles.clearIcon}
                source={require('../assets/clear.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.selectedCount}>{selectedCount}/1000</Text>
        <View style={styles.listContainer}>
          {search ? (
            filteredData.length ? (
              <FlatList
                keyExtractor={keyExtractor}
                data={filteredData}
                renderItem={renderUserItem}
              />
            ) : (
              <Text>Looks like there is no member with that name</Text>
            )
          ) : (
            <FlatList
              keyExtractor={keyExtractor}
              data={Object.values(teamMap)}
              renderItem={renderItem}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={!canProceed}
          style={{
            ...styles.button,
            backgroundColor: canProceed ? theme.primary : theme.grey,
          }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CreateAnnouncement;
