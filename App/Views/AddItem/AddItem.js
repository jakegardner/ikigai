import React from 'react';
import uuid from 'react-native-uuid';
import moment from 'moment';
import { get } from 'lodash';
import {
  Dimensions,
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import { compose, withProps, withState } from 'recompose';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import ButtonBar from '../../Components/ButtonBar';

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
}) => (
  <View style={styles.formContainer}>
    <FormInput label="Name">
      <TextInput style={styles.textInput} onChangeText={setName} value={name} />
    </FormInput>
    {topicName && (
      <FormInput label="Date">
        <Text>{date.format('M/D/YY')}</Text>
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
}) => (
  <View style={styles.container}>
    <AddForm
      topicName={topicName}
      setName={setName}
      name={name}
      date={date}
    />
    <ButtonBar buttons={buttons} />
  </View>
);

const enhance = compose(
  withMappedNavigationParams(),
  withState('name', 'setName', ({ task }) => get(task, 'label')),
  withState('date', 'setDate', ({ task }) => moment.utc(get(task, 'date')) || moment.utc()),
  withProps(({
    navigation,
    addTopic,
    addTask,
    editTask,
    name,
    task,
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
);

const wrapped = enhance(AddItem);
wrapped.navigationOptions = ({ navigation }) => ({
  title: (navigation.getParam('task') && `Edit ${navigation.getParam('task').label}`)
    || (navigation.getParam('topicName') && `New task for ${navigation.getParam('topicName')}`)
    || 'New Topic',
});

export default wrapped;
