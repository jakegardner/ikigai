import Immutable from 'seamless-immutable';
import { createDuck } from 'redux-duck';

const topicsDuck = createDuck('topics');

export const INITIAL_STATE = Immutable.from({
  items: {},
});

const reducer = topicsDuck.createReducer({

}, INITIAL_STATE);

export default reducer;
