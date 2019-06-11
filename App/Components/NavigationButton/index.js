import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

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

const NavigationButton = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default NavigationButton;
