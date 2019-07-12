import Immutable from 'seamless-immutable';
import { createDuck } from 'redux-duck';
import { createSelector } from 'reselect';
import { some } from 'lodash';
import moment from 'moment';

const topicsDuck = createDuck('topics');

export const ADD_TOPIC = topicsDuck.defineType('ADD_TOPIC');
export const DELETE_TOPIC = topicsDuck.defineType('DELETE_TOPIC');
export const ADD_TASK = topicsDuck.defineType('ADD_TASK');
export const DELETE_TASK = topicsDuck.defineType('DELETE_TASK');
export const EDIT_TASK = topicsDuck.defineType('EDIT_TASK');
export const TOGGLE_TASK_COMPLETE = topicsDuck.defineType('TOGGLE_TASK_COMPLETE');

export const addTopic = topicsDuck.createAction(ADD_TOPIC);
export const deleteTopic = topicsDuck.createAction(DELETE_TOPIC);
export const addTask = topicsDuck.createAction(ADD_TASK);
export const deleteTask = topicsDuck.createAction(DELETE_TASK);
export const editTask = topicsDuck.createAction(EDIT_TASK);
export const toggleTaskComplete = topicsDuck.createAction(TOGGLE_TASK_COMPLETE);

export const INITIAL_STATE = Immutable.from({
  items: [],
});

const reducer = topicsDuck.createReducer({
  [ADD_TOPIC]: (state, { payload }) =>
    state.merge({ items: [...state.items, payload] }),
  [DELETE_TOPIC]: (state, { payload }) =>
    state.merge({ items: state.items.filter(item => item.id !== payload.id) }),
  [ADD_TASK]: (state, { payload }) => {
    const { task } = payload;
    if (!task) {
      console.error(`${ADD_TASK} missing task`);
      return state;
    }
    if (!task.topicId) {
      console.error(`${ADD_TASK} missing topic id`);
      return state;
    }
    const { topicId } = task;
    const topicIndex = state.items.findIndex(topic => topic.id === topicId);
    return state.setIn(
      ['items', topicIndex, 'tasks'],
      [...state.items[topicIndex].tasks, { ...task, topicId }],
    );
  },
  [DELETE_TASK]: (state, { payload }) => {
    const { topicId, id: taskId } = payload;
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
  [EDIT_TASK]: (state, { payload }) => {
    const { task } = payload;
    const { topicId, id: taskId } = task;
    if (!topicId) {
      console.error(`${EDIT_TASK} missing topic id`);
      return state;
    }
    if (!taskId) {
      console.error(`${EDIT_TASK} missing task id`);
      return state;
    }
    const topicIndex = state.items.findIndex(item => item.id === topicId);
    const taskIndex = state.items[topicIndex].tasks.findIndex(item => item.id === taskId);
    const taskToUpdate = state.items[topicIndex].tasks[taskIndex];
    return state.setIn(['items', topicIndex, 'tasks', taskIndex], { ...taskToUpdate, ...task });
  },
  [TOGGLE_TASK_COMPLETE]: (state, { payload }) => {
    const { topicId, id: taskId } = payload;
    if (!topicId) {
      console.error(`${TOGGLE_TASK_COMPLETE} missing topic id`);
      return state;
    }
    if (!taskId) {
      console.error(`${TOGGLE_TASK_COMPLETE} missing task id`);
      return state;
    }
    const topicIndex = state.items.findIndex(item => item.id === topicId);
    const taskIndex = state.items[topicIndex].tasks.findIndex(item => item.id === taskId);
    const taskToUpdate = state.items[topicIndex].tasks[taskIndex];
    return state.setIn(
      ['items', topicIndex, 'tasks', taskIndex],
      { ...taskToUpdate, status: taskToUpdate.status === 'complete' ? 'incomplete' : 'complete' },
    );
  },
}, INITIAL_STATE);

const selectTopics = state => state.topics.items;

export const selectTasksFor = createSelector(
  selectTopics,
  topics => (topicId) => {
    if (!topicId) {
      return [];
    }
    const topic = topics.find(item => item.id === topicId);
    return topic.tasks;
  },
);

export const selectTodayTasks = createSelector(
  selectTopics,
  (topics) => {
    const allTasks = topics.flatMap(topic => topic.tasks);
    const formatter = mom => moment.utc(mom).locale('en').format('MDYYYY');
    return allTasks.filter((task) => {
      const now = moment.utc();
      const isSameDayTask = formatter(task.date) === formatter(now);

      const { repeat } = task;
      if (repeat && moment.utc(task.date).isBefore(now)) {
        const { days, duration } = repeat;
        const matchesDayOfWeek = some(
          days,
          (daySelected, index) => daySelected && index === now.day(),
        );
        if (duration === 'infinite') {
          return matchesDayOfWeek;
        }
        if (duration === 'week' && now.isBefore(moment.utc(task.date).add(1, 'week'))) {
          return matchesDayOfWeek;
        }
      }
      return isSameDayTask;
    });
  },
);

export default reducer;
