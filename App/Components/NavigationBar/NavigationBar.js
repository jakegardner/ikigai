import React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { compose, withProps } from 'recompose';
import { get } from 'lodash';
import NavigationButton from '../../Components/NavigationButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    position: 'absolute',
    width: screenWidth,
    textAlign: 'center',
  },
});

const NavigationBar = ({ title, leftButton, rightButton }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {leftButton}
    {rightButton}
  </View>
);

const createNavButton = (descriptor) => (
  descriptor ? <NavigationButton label={descriptor.label} onPress={descriptor.onPress} /> : null
);

const enhance = compose(
  withProps(({ navButtons }) => ({
    leftButton: get(navButtons, '[0]') && createNavButton(navButtons[0]),
    rightButton: get(navButtons, '[1]') && createNavButton(navButtons[1]),
  })),
);

export default enhance(NavigationBar);
