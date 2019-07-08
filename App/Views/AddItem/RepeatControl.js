import React from 'react';
import { View, StyleSheet } from 'react-native';
import Checkbox from '../../Components/Checkbox';
import RadioButton from '../../Components/RadioButton';

const styles = StyleSheet.create({
  duration: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const RepeatControl = ({
  repeat,
  toggleDay,
  setDuration,
}) => (
  <View style={{ flex: 1, marginTop: -10 }}>
    <Checkbox label="Monday" checked={repeat && repeat.days[0]} onCheck={() => toggleDay(0)} />
    <Checkbox label="Tuesday" checked={repeat && repeat.days[1]} onCheck={() => toggleDay(1)} />
    <Checkbox label="Wednesday" checked={repeat && repeat.days[2]} onCheck={() => toggleDay(2)} />
    <Checkbox label="Thursday" checked={repeat && repeat.days[3]} onCheck={() => toggleDay(3)} />
    <Checkbox label="Friday" checked={repeat && repeat.days[4]} onCheck={() => toggleDay(4)} />
    <Checkbox label="Saturday" checked={repeat && repeat.days[5]} onCheck={() => toggleDay(5)} />
    <Checkbox label="Sunday" checked={repeat && repeat.days[6]} onCheck={() => toggleDay(6)} />
    <View style={styles.duration}>
      <RadioButton label="This week" checked={repeat && repeat.duration === 'week'} onCheck={() => setDuration('week')} />
      <RadioButton label="Every week" checked={repeat && repeat.duration === 'infinite'} onCheck={() => setDuration('infinite')} />
    </View>
  </View>
);

export default RepeatControl;
