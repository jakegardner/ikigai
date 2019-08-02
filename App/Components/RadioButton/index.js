import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { compose, withHandlers } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle as faSolidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faEmptyCircle } from '@fortawesome/free-regular-svg-icons';
import { defaultFont } from '../../Common/font';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: defaultFont,
    color: '#FFFFFF',
  },
});

const RadioButton = ({ checked, label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.row}>
      <View>
        {checked
          ? <FontAwesomeIcon icon={faSolidCircle} color="white" />
          : <FontAwesomeIcon icon={faEmptyCircle} color="white" />
        }
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const enhance = compose(
  withHandlers({
    onPress: ({ onCheck }) => () => {
      if (onCheck) {
        onCheck();
      }
    },
  }),
);

export default enhance(RadioButton);
