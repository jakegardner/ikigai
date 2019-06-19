import { connect } from 'react-redux';
import { compose } from 'recompose';
import AddItem from './AddItem';
import {
  addTopic,
  addTask,
  editTask,
} from '../Topics/duck';

const mapDispatchToProps = {
  addTopic,
  addTask,
  editTask,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
);

export default enhance(AddItem);
