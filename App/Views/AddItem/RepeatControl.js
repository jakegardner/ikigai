import React from 'react';
import { View, StyleSheet } from 'react-native';
import Checkbox from '../../Components/Checkbox';
import RadioButton from '../../Components/RadioButton';

const styles = StyleSheet.create({
  container: {
  },
  duration: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const RepeatControl = ({
  days,
  duration,
  toggleDay,
  setDuration,
  width,
}) => (
  <View style={[styles.container, { width }]}>
    <Checkbox label="Sunday" checked={days && days[0]} onCheck={() => toggleDay(6)} />
    <Checkbox label="Monday" checked={days && days[1]} onCheck={() => toggleDay(0)} />
    <Checkbox label="Tuesday" checked={days && days[2]} onCheck={() => toggleDay(1)} />
    <Checkbox label="Wednesday" checked={days && days[3]} onCheck={() => toggleDay(2)} />
    <Checkbox label="Thursday" checked={days && days[4]} onCheck={() => toggleDay(3)} />
    <Checkbox label="Friday" checked={days && days[5]} onCheck={() => toggleDay(4)} />
    <Checkbox label="Saturday" checked={days && days[6]} onCheck={() => toggleDay(5)} />
    <View style={styles.duration}>
      <RadioButton
        label="This week"
        checked={duration === 'week'}
        onCheck={() => setDuration('week')}
      />
      <RadioButton
        label="Every week"
        checked={duration === 'infinite'}
        onCheck={() => setDuration('infinite')}
      />
    </View>
  </View>
);

export default RepeatControl;
