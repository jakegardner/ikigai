import Immutable from 'seamless-immutable';
import { createDuck } from 'redux-duck';
import { createSelector } from 'reselect';

const topicsDuck = createDuck('topics');

export const ADD_TOPIC = topicsDuck.defineType('ADD_TOPIC');
export const DELETE_TOPIC = topicsDuck.defineType('DELETE_TOPIC');
export const ADD_TASK = topicsDuck.defineType('ADD_TASK');
export const DELETE_TASK = topicsDuck.defineType('DELETE_TASK');

export const addTopic = topicsDuck.createAction(ADD_TOPIC);
export const deleteTopic = topicsDuck.createAction(DELETE_TOPIC);
export const addTask = topicsDuck.createAction(ADD_TASK);
export const deleteTask = topicsDuck.createAction(DELETE_TASK);

export const INITIAL_STATE = Immutable.from({
  items: [],
});

const reducer = topicsDuck.createReducer({
  [ADD_TOPIC]: (state, { payload }) =>
    state.merge({ items: [...state.items, payload] }),
  [DELETE_TOPIC]: (state, { payload }) =>
    state.merge({ items: state.items.filter(item => item.id !== payload.id) }),
  [ADD_TASK]: (state, { payload }) => {
    const { topicId, task } = payload;
    if (!topicId) {
      console.error(`${ADD_TASK} missing topic id`);
      return state;
    }
    if (!task) {
      console.error(`${ADD_TASK} missing task`);
      return state;
    }
    const topicIndex = state.items.findIndex(topic => topic.id === topicId);
    return state.setIn(['items', topicIndex, 'tasks'], [...state.items[topicIndex].tasks, task]);
  },
  [DELETE_TASK]: (state, { payload }) => {
    const { topicId, taskId } = payload;
    if (!topicId) {
      console.error(`${DELETE_TASK} missing topic id`);
      return state;
    }
    if (!taskId) {
      console.error(`${DELETE_TASK} missing task id`);
      return state;
    }
    const topicIndex = state.items.findIndex(item => item.id === topicId);
    return state.setIn(['items', topicIndex, 'tasks'], state.items[topicIndex].tasks.filter(task => task.id !== taskId));
  },
}, INITIAL_STATE);

export const selectTasksFor = createSelector(
  state => state.topics.items,
  topics => (topicId) => {
    if (!topicId) {
      return [];
    }
    const topic = topics.find(item => item.id === topicId);
    return topic.tasks;
  },
);

export default reducer;
