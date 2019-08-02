import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { defaultFont } from '../../Common/font';

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: 'absolute',
    height: 60,
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3366',
  },
  buttonContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontFamily: defaultFont,
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    paddingTop: 3,
  },
  divider: {
    backgroundColor: '#FFFFFF',
    height: 40,
    width: StyleSheet.hairlineWidth,
    opacity: 0.8,
  },
});

const Button = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <View>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const Divider = () => (
  <View style={styles.divider} />
);

const ButtonBar = ({ buttons = [] }) => (
  <View style={styles.container}>
    {buttons.map((descriptor, index) => (
      <React.Fragment>
        <Button label={descriptor.label} onPress={descriptor.onPress} />
        {index < buttons.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </View>
);

export default ButtonBar;
