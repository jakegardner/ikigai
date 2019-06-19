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
import NavigationButton from '../../Components/NavigationButton';

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
  withProps(({ navigation, items }) => ({
    buttons: [
      { label: 'Topics', onPress: () => navigation.navigate('Topics') },
    ],
    items: items.map(item => ({
      ...item,
      onPress: () => navigation.navigate('AddItem', {
        task: item,
        topicName: navigation.getParam('topicName'),
      }),
    })),
  })),
);

const wrapped = enhance(Tasks);
wrapped.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('topicName'),
  headerRight: (
    <NavigationButton
      label="Add"
      onPress={() => navigation.navigate('AddItem', {
        topicId: navigation.getParam('topicId'),
        topicName: navigation.getParam('topicName'),
      })}
    />
  ),
});

export default wrapped;
