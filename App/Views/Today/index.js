import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import {
  selectTodayTasks,
  toggleTaskComplete,
  deleteTask,
} from '../Topics/duck';

import Today from './Today';

const mapStateToProps = state => ({
  items: selectTodayTasks(state),
});

const mapDispatchToProps = {
  dispatchToggleTaskComplete: toggleTaskComplete,
  dispatchDeleteTask: deleteTask,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onTaskPress: ({ dispatchToggleTaskComplete }) => task => dispatchToggleTaskComplete(task),
    onDeletePress: ({ dispatchDeleteTask }) => task => dispatchDeleteTask(task),
  }),
);

const wrapped = enhance(Today);
wrapped.navigationOptions = {
  title: 'Today',
};

export default wrapped;
