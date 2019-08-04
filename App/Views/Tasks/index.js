import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import Tasks from './Tasks';
import {
  selectTasksFor,
  deleteTask,
} from '../Topics/duck';
import { AddButton, BackButton } from '../../Components/NavigationButton';
import { headerStyles } from '../../Common/styles';

const mapStateToProps = (state, { topicId }) => ({
  items: selectTasksFor(state)(topicId),
});

const mapDispatchToProps = {
  dispatchDeleteTask: deleteTask,
};

const enhance = compose(
  withMappedNavigationParams(),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onTaskPress: ({ navigation }) => item => navigation.navigate('AddItem', {
      task: item,
      topicName: navigation.getParam('topicName'),
    }),
    onDelete: ({ dispatchDeleteTask }) => id => dispatchDeleteTask(id),
  }),
);

const wrapped = enhance(Tasks);
wrapped.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('topicName'),
  headerLeft: (
    <BackButton
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <AddButton
      onPress={() => navigation.navigate('AddItem', {
        topicId: navigation.getParam('topicId'),
        topicName: navigation.getParam('topicName'),
      })}
    />
  ),
  ...headerStyles,
});

export default wrapped;
