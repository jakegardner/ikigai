import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: 'absolute',
    height: 40,
    width: screenWidth,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DEDEDE',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#0074BC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

const Button = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <View>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const ButtonBar = ({ buttons = [] }) => (
  <View style={styles.container}>
    {buttons.map(descriptor => <Button label={descriptor.label} onPress={descriptor.onPress} />)}
  </View>
);

export default ButtonBar;
