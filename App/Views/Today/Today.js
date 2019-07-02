import React from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { compose, withProps } from 'recompose';

import ListView from '../../Components/ListView';

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  rowContainer: {
    width: screenWidth,
    paddingLeft: 15,
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFEF',
  },
  rowLabel: {
    fontSize: 16,
  },
});

const TodayRow = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rowContainer}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const Today = ({ items, navButtons, buttons }) => (
  <ListView
    items={items}
    ItemRenderer={TodayRow}
    navButtons={navButtons}
    buttons={buttons}
  />
);

const enhance = compose(
  withProps(({ navigation, items, onTaskPress }) => ({
    buttons: [
      { label: 'Topics', onPress: () => navigation.navigate('Topics') },
    ],
    items: items.map(item => ({ ...item, onPress: () => onTaskPress(item) })),
  })),
);

export default enhance(Today);
