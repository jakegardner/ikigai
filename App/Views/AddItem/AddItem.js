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
} from 'recompose';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import ButtonBar from '../../Components/ButtonBar';
import { isIphoneX } from '../../Common/util';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    height: screenHeight - 128,
    width: screenWidth,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  formInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  formInputLabel: {
    fontSize: 14,
    marginRight: 5,
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
    {topicName && <FormInput label="Repeat" />}
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
  onRequestClose,
}) => (
  <View style={styles.container}>
    <AddForm
      topicName={topicName}
      setName={setName}
      name={name}
      date={date}
      setCalendarModalVisible={setCalendarModalVisible}
    />
    <ButtonBar buttons={buttons} />
    <Modal
      animationType="slide"
      transparent
      visible={calendarModalVisible}
      onRequestClose={onRequestClose}
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
  withState('calendarModalVisible', 'setCalendarModalVisible', false),
  withProps(({
    navigation,
    addTopic,
    addTask,
    editTask,
    name,
    task,
    date,
    topicId,
  }) => ({
    buttons: [
      { label: 'Cancel', onPress: () => navigation.goBack() },
      {
        label: 'Save',
        onPress: () => {
          if (task) {
            const { id: taskId } = task;
            editTask({
              topicId: task.topicId,
              taskId,
              task: {
                label: name,
                date,
              },
            });
          } else if (topicId) {
            addTask({
              topicId,
              task: {
                label: name,
                id: uuid.v4(),
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
    onRequestClose: ({ setCalendarModalVisible }) => () => setCalendarModalVisible(false),
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
