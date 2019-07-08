import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { compose, withState, withHandlers } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle as faSolidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faEmptyCircle } from '@fortawesome/free-regular-svg-icons';

const styles = StyleSheet.create({
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

const RadioButton = ({ checked, label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.row}>
      <View>
        {checked
          ? <FontAwesomeIcon icon={faSolidCircle} />
          : <FontAwesomeIcon icon={faEmptyCircle} />
        }
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

export default enhance(RadioButton);
