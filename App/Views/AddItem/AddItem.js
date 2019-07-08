import React from 'react';
import uuid from 'react-native-uuid';
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
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import ButtonBar from '../../Components/ButtonBar';
import RepeatControl from './RepeatControl';
import { isIphoneX } from '../../Common/util';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    height: screenHeight - (isIphoneX ? 128 : 64),
    width: screenWidth,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  formInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  formInputLabel: {
    fontSize: 14,
    marginRight: 15,
  },
  label: {
    fontSize: 14,
  },
  textInput: {
    lineHeight: 18,
    width: 250,
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
    <Text style={styles.formInputLabel}>{`${label}:`}</Text>
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
}) => (
  <View style={styles.formContainer}>
    <FormInput label="Name">
      <TextInput style={styles.textInput} onChangeText={setName} value={name} />
    </FormInput>
    {topicName && (
      <FormInput label="Date">
        <TouchableOpacity onPress={() => setCalendarModalVisible(true)}>
          <Text>{moment.utc(date).format('YYYY-MM-DD')}</Text>
        </TouchableOpacity>
      </FormInput>
    )}
    {topicName && (
      <FormInput label="Repeat">
        {repeat || repeatVisible ? (
          <RepeatControl
            repeat={repeat}
            toggleDay={toggleDay}
            setDuration={setDuration}
          />
        ) : (
          <TouchableOpacity onPress={() => setRepeatVisible(true)}>
            <Text>None</Text>
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
}) => (
  <View style={styles.container}>
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
  </View>
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
    navigation,
    addTopic,
    addTask,
    editTask,
    name,
    task,
    date,
    days,
    duration,
    topicId,
  }) => ({
    buttons: [
      { label: 'Cancel', onPress: () => navigation.goBack() },
      {
        label: 'Save',
        onPress: () => {
          if (task) {
            editTask({
              task: {
                ...task,
                label: name,
                date,
                repeat: {
                  days,
                  duration,
                },
              },
            });
          } else if (topicId) {
            addTask({
              task: {
                topicId,
                label: name,
                id: uuid.v4(),
                repeat: {
                  days,
                  duration,
                },
              },
            });
          } else {
            addTopic({
              id: uuid.v4(),
              label: name,
              tasks: [],
            });
          }
          navigation.goBack();
        },
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

const wrapped = enhance(AddItem);
wrapped.navigationOptions = ({ navigation }) => ({
  title: (navigation.getParam('task') && `Edit ${navigation.getParam('task').label}`)
    || (navigation.getParam('topicName') && `New task for ${navigation.getParam('topicName')}`)
    || 'New Topic',
});

export default wrapped;
