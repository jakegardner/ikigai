import React from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableHighlight,
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
    backgroundColor: '#FFFFFF',
  },
  rowLabel: {
    fontSize: 16,
  },
});

const TaskRow = ({ label, onPress }) => (
  <TouchableHighlight onPress={onPress} style={styles.rowContainer} underlayColor="#EFEFEF">
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableHighlight>
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
