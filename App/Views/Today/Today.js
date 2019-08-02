import React from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { compose, withProps } from 'recompose';
import { defaultFont } from '../../Common/font';
import ListView from '../../Components/ListView';

import completePng from '../../Assets/done.png';
import incompletePng from '../../Assets/incomplete.png';

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  rowContainer: {
    width: screenWidth,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'transparent',
  },
  rowLabel: {
    fontSize: 16,
    fontFamily: defaultFont,
    color: '#FFFFFF',
    paddingTop: 1,
  },
});

const TodayRow = ({ label, status, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.rowContainer}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Image source={status === 'complete' ? completePng : incompletePng} />
    </View>
  </TouchableOpacity>
);

const Today = ({ items, navButtons, buttons }) => (
  <React.Fragment>
    <StatusBar barStyle="light-content" />
    <ListView
      items={items}
      ItemRenderer={TodayRow}
      navButtons={navButtons}
      buttons={buttons}
    />
  </React.Fragment>
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

export default enhance(Today);
