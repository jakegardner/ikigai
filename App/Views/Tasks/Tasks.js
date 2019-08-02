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
import { defaultFont } from '../../Common/font';

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  rowContainer: {
    width: screenWidth,
    paddingLeft: 15,
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'transparent',
  },
  rowLabel: {
    fontFamily: defaultFont,
    color: '#FFFFFF',
    fontSize: 14,
  },
});

const TaskRow = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rowContainer}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const Tasks = ({ items, navButtons, buttons }) => (
  <ListView
    items={items}
    ItemRenderer={TaskRow}
    navButtons={navButtons}
    buttons={buttons}
  />
);

const enhance = compose(
  withProps(({
    navigation,
    items,
    onTaskPress,
    onDeletePress,
  }) => ({
    buttons: [
      { label: 'Topics', onPress: () => navigation.navigate('Topics') },
    ],
    items: items.map(item => ({
      ...item,
      onPress: () => onTaskPress(item),
      onDelete: () => onDeletePress(item),
    })),
  })),
);

export default enhance(Tasks);
