import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import {theme} from '../utils/constants';
import commonStyles from '../utils/styles';
import ListItem from '../components/ListItem';
import ExpandableGroup from '../components/ExpansionGroup';

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

function CreateAnnouncement() {
  return (
    <View style={{flex: 1, padding: 24}}>
      <TextInput
        placeholderTextColor={theme.grey}
        placeholder="Announcement Name"
        style={commonStyles.inputBox}
      />
      <TextInput
        placeholderTextColor={theme.grey}
        placeholder="Add people"
        style={{...commonStyles.inputBox, marginTop: 24}}
      />
      <Text style={styles.selectedCount}>31/1000</Text>
      <ExpandableGroup>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </ExpandableGroup>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateAnnouncement;
