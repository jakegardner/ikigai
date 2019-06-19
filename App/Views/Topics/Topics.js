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

const TopicRow = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rowContainer}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const Topics = ({ items, buttons }) => (
  <ListView
    items={items}
    ItemRenderer={TopicRow}
    buttons={buttons}
  />
);

const enhance = compose(
  withProps(({ navigation, items }) => ({
    buttons: [
      { label: 'Today', onPress: () => navigation.navigate('Today') },
    ],
    items: items.map(item => ({
      ...item,
      onPress: () => navigation.navigate('Tasks', { topicName: item.label, topicId: item.id }),
    })),
  })),
);

const wrapped = enhance(Topics);
wrapped.navigationOptions = ({ navigation }) => ({
  title: 'Topics',
  headerRight: (
    <NavigationButton
      label="Add"
      onPress={() => navigation.navigate('AddItem')}
    />
  ),
});

export default wrapped;
