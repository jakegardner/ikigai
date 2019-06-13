import React from 'react';
import { Dimensions, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { compose, withProps } from 'recompose';
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

const TaskRow = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rowContainer}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const Tasks = ({ topicName, items, navButtons, buttons }) => (
  <ListView
    items={items}
    ItemRenderer={TaskRow}
    navButtons={navButtons}
    buttons={buttons}
  />
);

const enhance = compose(
  withProps(({ navigation }) => ({
    buttons: [
      { label: 'Today', onPress: () => navigation.navigate('Today') },
      { label: 'Topics', onPress: () => navigation.navigate('Topics') },
    ],
  })),
);

const wrapped = enhance(Tasks);
wrapped.navigationOptions = {
  title: 'Tasks',
};

export default wrapped;
