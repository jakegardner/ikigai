import React from 'react';
import { Dimensions, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationBar from '../../Components/NavigationBar';
import ButtonBar from '../../Components/ButtonBar';
import ListView from '../../Components/ListView';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

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

const TopicRow = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rowContainer}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const TopicsList = ({ items, navButtons, buttons }) => (
  <ListView
    title={'Topics'}
    items={items}
    ItemRenderer={TopicRow}
    navButtons={navButtons}
    buttons={buttons}
  />
);

export default TopicsList;
