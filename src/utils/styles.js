import {StyleSheet} from 'react-native';
import {theme} from './constants';

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    borderRadius: 5,
    height: 45,
    borderWidth: 2,
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 16,
    borderColor: theme.borderGrey,
  },
});

export default styles;
