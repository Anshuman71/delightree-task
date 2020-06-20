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
  return `${item.id}${item.name}${item.groupId}`;
}

function CreateAnnouncement({route, navigation}) {
  const [data, setData] = useState([]);
  console.log('CreateAnnouncement -> data', data);
  // console.log('CreateAnnouncement -> data', data);
  const [filteredData, setFilteredData] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [announcementName, setAnnouncementName] = useState('');
  const [canProceed, setProceed] = useState(false);

  useEffect(() => {
    const newGroups = [...teams];
    const nonMembers = [];
    users.forEach(user => {
      const {teamIds} = user;
      if (teamIds && Array.isArray(teamIds)) {
        teamIds.forEach(id => {
          const groupIndex = newGroups.findIndex(item => item.id === id);
          newGroups[groupIndex].members.push({...user, groupId: id});
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
      setMemberName(query);
      setFilteredData(
        users.filter(
          item => item.name && item.name.toLowerCase().includes(query),
        ),
      );
    } else {
      setMemberName('');
      setFilteredData([]);
    }
  }

  function onClear() {
    setMemberName('');
    setFilteredData([]);
  }

  const handleUpdate = ({index, value}) => {
    if (value.members && value.members.length) {
      return;
    }

    if (value.teamIds && value.teamIds.length) {
      const map = {};
      // let isSelected = null;

      value.teamIds.forEach(teamId => {
        // console.log('handleUpdate -> teamId', teamId);
        const newTeamValue = {
          ...data[teamId - 1],
          members: data[teamId - 1].members.map(member => {
            if (member.id === value.id) {
              return {...member, selected: !member.selected};
            }
            return {...member};
          }),
        };
        map[teamId - 1] = newTeamValue;
      });
      // map.forEach(item => {
      //   const [idx, group] = item;

      //   setData([...data.slice(0, idx), group, ...data.slice(idx + 1)]);
      // });
      const mapKeys = Object.keys(map);
      let newDataValue = data.map((item, idx) => {
        if (mapKeys.includes(idx.toString())) {
          return map[idx];
        }

        return item;
      });

      setData(newDataValue);
      console.log('handleUpdate -> newDataValue', newDataValue);

      return;
    }

    const newValue = {...value, selected: !value.selected};
    setData([...data.slice(0, index), newValue, ...data.slice(index + 1)]);
  };

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
    return (
      <ListItem
        data={item}
        handleUpdate={() => handleUpdate({index, value: item})}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
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
            value={memberName}
            onChangeText={handleFilter}
            style={{...commonStyles.inputBox}}
          />
          {!!memberName && (
            <TouchableOpacity onPress={onClear} style={styles.clearInput}>
              <Image
                style={styles.clearIcon}
                source={require('../assets/clear.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.selectedCount}>31/1000</Text>
        <View style={styles.listContainer}>
          {memberName ? (
            filteredData.length ? (
              <FlatList
                keyExtractor={keyExtractor}
                data={filteredData}
                renderItem={renderItem}
              />
            ) : (
              <Text>Looks like there is no member with that name</Text>
            )
          ) : (
            <FlatList
              keyExtractor={keyExtractor}
              data={data}
              renderItem={renderItem}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewTask', {
              title: announcementName,
              data: data,
            })
          }
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
