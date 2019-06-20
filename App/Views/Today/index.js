import { compose } from 'recompose';
import { connect } from 'react-redux';
import { selectTodayTasks } from '../Topics/duck';

import Today from './Today';

const mapStateToProps = state => ({
  items: selectTodayTasks(state),
});

const mapDispatchToProps = {
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Today);
