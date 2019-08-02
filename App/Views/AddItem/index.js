import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
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
            date,
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
