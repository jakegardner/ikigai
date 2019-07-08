import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { compose, withState, withHandlers } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#777777',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
  },
});

const Checkbox = ({ checked, onPress, label }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.row}>
      <View style={styles.container}>
        {checked ? <FontAwesomeIcon icon={faCheck} /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const enhance = compose(
  withState('checked', 'toggleChecked', ({ checked }) => checked),
  withHandlers({
    onPress: ({ onCheck, checked, toggleChecked }) => () => {
      const newState = !checked;
      toggleChecked(newState);
      if (onCheck) {
        onCheck(newState);
      }
    },
  }),
);

export default enhance(Checkbox);
