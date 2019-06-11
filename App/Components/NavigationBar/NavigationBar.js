import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { compose, withProps } from 'recompose';
import NavigationButton from '../../Components/NavigationButton';

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
  },
});

const NavigationBar = ({ title, leftButton, rightButton }) => (
  <View style={styles.container}>
    {leftButton}
    <Text style={styles.title}>{title}</Text>
    {rightButton}
  </View>
);

const createNavButton = (descriptor) => (
  descriptor ? <NavigationButton label={descriptor.label} onPress={descriptor.onPress} /> : null
);

const enhance = compose(
  withProps(({ navButtons }) => ({
    leftButton: createNavButton(navButtons[0]),
    rightButton: createNavButton(navButtons[1]),
  })),
);

export default enhance(NavigationBar);
