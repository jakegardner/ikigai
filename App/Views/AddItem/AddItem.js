import React from 'react';
import moment from 'moment';
import { get } from 'lodash';
import {
  Dimensions,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import {
  compose,
  withProps,
  withState,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import LinearGradient from 'react-native-linear-gradient';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import ButtonBar from '../../Components/ButtonBar';
import RepeatControl from './RepeatControl';
import { isIphoneX } from '../../Common/util';
import { defaultFont } from '../../Common/font';
import { bgGradient } from '../../Common/styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  formContainer: {
    paddingTop: 30,
    height: screenHeight - (isIphoneX ? 128 : 64),
    width: screenWidth,
    paddingHorizontal: 30,
  },
  formInputContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D8D8D8',
  },
  formInputLabel: {
    fontFamily: defaultFont,
    fontSize: 11,
    marginBottom: 10,
    color: '#FFFFFF',
    opacity: 0.7,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: defaultFont,
    fontSize: 14,
    color: '#FFFFFF',
  },
  textInput: {
    fontFamily: defaultFont,
    color: '#FFFFFF',
    lineHeight: 18,
    width: screenWidth - 60,
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    marginTop: 83 + (isIphoneX ? 44 : 0),
    height: screenHeight - 123 - (isIphoneX ? 84 : 0),
    width: screenWidth,
  },
});

const FormInput = ({ label, children }) => (
  <View style={styles.formInputContainer}>
    <Text style={styles.formInputLabel}>{label}</Text>
    {children}
  </View>
);

const AddForm = ({
  topicName,
  setName,
  name,
  date,
  setCalendarModalVisible,
  repeat,
  repeatVisible,
  setRepeatVisible,
  toggleDay,
  setDuration,
  days,
  duration,
}) => (
  <View style={styles.formContainer}>
    <FormInput label="Name">
      <TextInput style={styles.textInput} onChangeText={setName} value={name} />
    </FormInput>
    {topicName && (
      <FormInput label="Date">
        <TouchableOpacity onPress={() => setCalendarModalVisible(true)}>
          <Text style={styles.label}>{moment.utc(date).format('YYYY-MM-DD')}</Text>
        </TouchableOpacity>
      </FormInput>
    )}
    {topicName && (
      <FormInput label="Repeat">
        {repeat || repeatVisible ? (
          <RepeatControl
            days={days}
            duration={duration}
            toggleDay={toggleDay}
            setDuration={setDuration}
            width={screenWidth - 60}
          />
        ) : (
          <TouchableOpacity onPress={() => setRepeatVisible(true)}>
            <Text style={styles.label}>None</Text>
          </TouchableOpacity>
        )}
      </FormInput>
    )}
  </View>
);

const AddItem = ({
  buttons,
  topicName,
  date,
  setName,
  name,
  calendarModalVisible,
  setCalendarModalVisible,
  onDayPress,
  onRequestCloseCalendar,
  repeat,
  repeatVisible,
  setRepeatVisible,
  toggleDay,
  setDuration,
  days,
  duration,
}) => (
  <LinearGradient colors={bgGradient} style={styles.linearGradient}>
    <AddForm
      topicName={topicName}
      setName={setName}
      name={name}
      date={date}
      setCalendarModalVisible={setCalendarModalVisible}
      repeat={repeat}
      repeatVisible={repeatVisible}
      setRepeatVisible={setRepeatVisible}
      toggleDay={toggleDay}
      setDuration={setDuration}
      days={days}
      duration={duration}
    />
    <ButtonBar buttons={buttons} />
    <Modal
      animationType="slide"
      transparent
      visible={calendarModalVisible}
      onRequestCloseCalendar={onRequestCloseCalendar}
    >
      <View style={styles.modalBackground} />
      <View style={styles.modalContainer}>
        <CalendarList
          current={moment.utc(date).format('YYYY-MM-DD')}
          minDate={new Date()}
          onDayPress={onDayPress}
        />
      </View>
    </Modal>
  </LinearGradient>
);

const enhance = compose(
  withMappedNavigationParams(),
  withState('name', 'setName', ({ task }) => get(task, 'label')),
  withState('date', 'setDate', ({ task }) => moment.utc(get(task, 'date')) || moment.utc()),
  withState('repeat', 'setRepeat', ({ task }) => get(task, 'repeat')),
  withState('calendarModalVisible', 'setCalendarModalVisible', false),
  withState('repeatVisible', 'setRepeatVisible', false),
  withStateHandlers(
    ({ repeat }) => ({
      days: repeat ? repeat.days : Array(7).fill(false),
      duration: repeat ? repeat.duration : null,
    }),
    {
      toggleDay: ({ days }) => (index) => {
        const newDays = [...days];
        newDays[index] = !days[index];
        return { days: newDays };
      },
      setDuration: () => value => ({
        duration: value,
      }),
    },
  ),
  withProps(({
    onSave,
  }) => ({
    buttons: [
      {
        label: 'Save',
        onPress: onSave,
      },
    ],
  })),
  withHandlers({
    onRequestCloseCalendar: ({ setCalendarModalVisible }) => () => setCalendarModalVisible(false),
    onRequestCloseRepeat: ({ setRepeatVisible }) => () => setRepeatVisible(false),
    onDayPress: ({ setCalendarModalVisible, setDate }) => (day) => {
      setDate(day.timestamp);
      setCalendarModalVisible(false);
    },
  }),
);

export default enhance(AddItem);
