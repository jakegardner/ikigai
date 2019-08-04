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
  },
  rowLabel: {
    fontFamily: defaultFont,
    color: '#FFFFFF',
    fontSize: 14,
  },
});

const TopicRow = ({ label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.rowContainer}
  >
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const Topics = ({ items, buttons, onDelete }) => (
  <ListView
    items={items}
    ItemRenderer={TopicRow}
    buttons={buttons}
    onDeleteItem={onDelete}
  />
);

const enhance = compose(
  withProps(({
    navigation,
    items,
    onTaskPress,
  }) => ({
    buttons: [
      { label: 'Today', onPress: () => navigation.navigate('Today') },
    ],
    items: items.map(item => ({
      ...item,
      onPress: () => onTaskPress(item),
    })),
  })),
);

export default enhance(Topics);
