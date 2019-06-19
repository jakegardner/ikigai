import { connect } from 'react-redux';
import { compose } from 'recompose';
import Tasks from './Tasks';
import {
  selectTasksFor,
} from '../Topics/duck';

const mapStateToProps = (state, { navigation }) => ({
  items: selectTasksFor(state)(navigation.getParam('topicId')),
});

const mapDispatchToProps = {
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Tasks);
