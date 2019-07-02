import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { selectTodayTasks, toggleTaskComplete } from '../Topics/duck';

import Today from './Today';

const mapStateToProps = state => ({
  items: selectTodayTasks(state),
});

const mapDispatchToProps = {
  dispatchToggleTaskComplete: toggleTaskComplete,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onTaskPress: ({ dispatchToggleTaskComplete }) => task => dispatchToggleTaskComplete(task),
  }),
);

const wrapped = enhance(Today);
wrapped.navigationOptions = {
  title: 'Today',
};

export default wrapped;
