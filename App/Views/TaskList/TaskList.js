import React from 'react';
import { Dimensions, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationBar from '../../Components/NavigationBar';
import ButtonBar from '../../Components/ButtonBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  listContainer: {
    height: screenHeight - 80,
    width: screenWidth,
  },
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

const TaskRow = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rowContainer}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const TaskListRenderer = ({ items }) => (
  <View style={styles.listContainer}>
    <FlatList
      data={items}
      keyExtractor={({ label }) => label}
      renderItem={({ item }) => <TaskRow label={item.label} onPress={item.onPress} />}
    />
  </View>
);

const TasksList = ({ topicName, items, navButtons, buttons }) => (
  <View>
    <NavigationBar
      title={topicName}
      navButtons={navButtons}
    />
    <TaskListRenderer
      items={items}
    />
    <ButtonBar
      buttons={buttons}
    />
  </View>
);

export default TasksList;
