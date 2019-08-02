import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import addPng from '../../Assets/add.png';
import backPng from '../../Assets/back.png';
import closePng from '../../Assets/close.png';
import createPng from '../../Assets/create.png';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
});

const NavigationButton = image => ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Image source={image} />
    </View>
  </TouchableOpacity>
);

export const AddButton = NavigationButton(addPng);
export const BackButton = NavigationButton(backPng);
export const CloseButton = NavigationButton(closePng);
export const CreateButton = NavigationButton(createPng);
