import { connect } from 'react-redux';
import { compose } from 'recompose';
import AddItem from './AddItem';
import {
  addTopic,
  addTask,
} from '../Topics/duck';

const mapDispatchToProps = {
  addTopic,
  addTask,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
);

export default enhance(AddItem);
