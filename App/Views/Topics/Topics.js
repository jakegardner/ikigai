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

const TopicRow = ({ label, onPress }) => (
  <TouchableHighlight onPress={onPress} style={styles.rowContainer} underlayColor="#EFEFEF">
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableHighlight>
);

const Topics = ({ items, buttons }) => (
  <ListView
    items={items}
    ItemRenderer={TopicRow}
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
      { label: 'Today', onPress: () => navigation.navigate('Today') },
    ],
    items: items.map(item => ({
      ...item,
      onPress: () => onTaskPress(item),
      onDelete: () => onDeletePress(item),
    })),
  })),
);

export default enhance(Topics);
