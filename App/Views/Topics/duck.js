import Immutable from 'seamless-immutable';
import { createDuck } from 'redux-duck';

const topicsDuck = createDuck('topics');

export const ADD_TOPIC = topicsDuck.defineType('ADD_TOPIC');
export const DELETE_TOPIC = topicsDuck.defineType('DELETE_TOPIC');

export const addTopic = topicsDuck.createAction(ADD_TOPIC);
export const deleteTopic = topicsDuck.createAction(DELETE_TOPIC);

export const INITIAL_STATE = Immutable.from({
  items: [],
});

const reducer = topicsDuck.createReducer({
  [ADD_TOPIC]: (state, { payload }) =>
    state.merge({ items: [...state.items, payload] }),
  [DELETE_TOPIC]: (state, { payload }) =>
    state.merge({ items: state.items.filter(item => item.id !== payload.id) }),
}, INITIAL_STATE);

export default reducer;
