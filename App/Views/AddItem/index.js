import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';
import {
  compose,
  withState,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import uuid from 'react-native-uuid';
import AddItem from './AddItem';
import {
  addTopic,
  addTask,
  editTask,
} from '../Topics/duck';
import { headerStyles } from '../../Common/styles';
import { CloseButton, CreateButton } from '../../Components/NavigationButton';

const mapDispatchToProps = {
  dispatchAddTopic: addTopic,
  dispatchAddTask: addTask,
  dispatchEditTask: editTask,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
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
  withHandlers({
    onSave: ({
      navigation,
      dispatchAddTopic,
      dispatchAddTask,
      dispatchEditTask,
      name,
      task,
      date,
      days,
      duration,
      topicId,
    }) => () => {
      if (task) {
        dispatchEditTask({
          task: {
            ...task,
            label: name,
            date: date.valueOf(),
            repeat: {
              days,
              duration,
            },
          },
        });
      } else if (topicId) {
        dispatchAddTask({
          task: {
            topicId,
            label: name,
            id: uuid.v4(),
            date: date.valueOf(),
            repeat: {
              days,
              duration,
            },
          },
        });
      } else {
        dispatchAddTopic({
          id: uuid.v4(),
          label: name,
          tasks: [],
        });
      }
      navigation.goBack();
    },
  }),
);

const wrapped = enhance(AddItem);
wrapped.navigationOptions = ({
  navigation,
  task,
  topicName,
}) => ({
  title: (task && `Edit ${task.label}`)
    || (topicName && `New task for ${topicName}`)
    || 'New Topic',
  ...headerStyles,
  headerLeft: (
    <CloseButton
      onPress={() => navigation.goBack()}
    />
  ),
});

export default wrapped;
