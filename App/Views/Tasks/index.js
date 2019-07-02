import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import Tasks from './Tasks';
import {
  selectTasksFor,
  deleteTask,
} from '../Topics/duck';
import NavigationButton from '../../Components/NavigationButton';

const mapStateToProps = (state, { navigation }) => ({
  items: selectTasksFor(state)(navigation.getParam('topicId')),
});

const mapDispatchToProps = {
  dispatchDeleteTask: deleteTask,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onTaskPress: ({ navigation }) => item => navigation.navigate('AddItem', {
      task: item,
      topicName: navigation.getParam('topicName'),
    }),
    onDeletePress: ({ dispatchDeleteTask }) => task => dispatchDeleteTask(task),
  }),
);

const wrapped = enhance(Tasks);
wrapped.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('topicName'),
  headerRight: (
    <NavigationButton
      label="Add"
      onPress={() => navigation.navigate('AddItem', {
        topicId: navigation.getParam('topicId'),
        topicName: navigation.getParam('topicName'),
      })}
    />
  ),
});

export default wrapped;
