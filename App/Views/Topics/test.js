/* eslint-disable import/no-extraneous-dependencies, no-undef */
import { expect } from 'chai';
import moment from 'moment';

import reducer, {
  INITIAL_STATE,
  addTopic,
  deleteTopic,
  addTask,
  deleteTask,
  editTask,
  selectTasksFor,
  selectTodayTasks,
  toggleTaskComplete,
} from './duck';

describe('topics', () => {
  describe('reducer', () => {
    it('returns default state', () => {
      expect(reducer()).to.deep.equal(INITIAL_STATE);
    });

    it('adds new topic', () => {
      const newTopic = { id: '1', label: 'topic' };
      const state = reducer(INITIAL_STATE, addTopic(newTopic));
      expect(state.items[0]).to.deep.equal(newTopic);
    });

    it('deletes topic', () => {
      const newTopic = { id: '1', label: 'topic' };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        deleteTopic({ id: '1' }),
      );
      expect(state.items.length).to.equal(0);
    });

    it('does not delete unspecified topic', () => {
      const newTopic = { id: '1', label: 'topic' };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        deleteTopic({ id: '2' }),
      );
      expect(state.items.length).to.equal(1);
      expect(state.items[0].id).to.equal('1');
    });

    it('adds new task', () => {
      const newTopic = { id: '1', label: 'topic', tasks: [] };
      const newTask = { id: 'a', label: 'task', topicId: '1' };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        addTask({ task: newTask }),
      );
      expect(state.items[0].tasks[0].label).to.equal('task');
      expect(state.items[0].tasks[0].id).to.equal('a');
      expect(state.items[0].tasks[0].topicId).to.equal('1');
    });

    it('deletes task', () => {
      const newTask = { id: '1', label: 'task' };
      const newTopic = { id: '1', label: 'topic', tasks: [newTask] };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        deleteTask({ topicId: '1', taskId: '1' }),
      );
      expect(state.items[0].tasks.length).to.equal(0);
    });

    it('does not delete unspecified task', () => {
      const newTask = { id: '1', label: 'task' };
      const newTopic = { id: '1', label: 'topic', tasks: [newTask] };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        deleteTask({ topicId: '1', taskId: '2' }),
      );
      expect(state.items[0].tasks.length).to.equal(1);
      expect(state.items[0].tasks[0]).to.deep.equal(newTask);
    });

    it('edits task', () => {
      const newTask = { id: '1', topicId: '1', label: 'task' };
      const newTopic = { id: '1', label: 'topic', tasks: [newTask] };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        editTask({ task: { id: '1', topicId: '1', label: 'updated task' } }),
      );
      expect(state.items[0].tasks[0].label).to.equal('updated task');
    });

    it('toggles task complete status', () => {
      const newTask = { id: 'a', label: 'task', status: 'incomplete' };
      const newTopic = { id: '1', label: 'topic', tasks: [newTask] };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        toggleTaskComplete({ topicId: '1', taskId: 'a' }),
      );
      expect(state.items[0].tasks[0].id).to.equal('a');
      expect(state.items[0].tasks[0].status).to.equal('complete');
    });

    it('toggles task incomplete status', () => {
      const newTask = { id: 'a', label: 'task', status: 'complete' };
      const newTopic = { id: '1', label: 'topic', tasks: [newTask] };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        toggleTaskComplete({ topicId: '1', taskId: 'a' }),
      );
      expect(state.items[0].tasks[0].id).to.equal('a');
      expect(state.items[0].tasks[0].status).to.equal('incomplete');
    });
  });

  describe('selectors', () => {
    it('gets tasks for topic', () => {
      const newTask = { id: '1', label: 'task' };
      const newTopic = { id: '1', label: 'topic', tasks: [newTask] };
      const state = { topics: INITIAL_STATE.merge({ items: [newTopic] }) };
      const tasks = selectTasksFor(state)('1');
      expect(tasks[0]).to.deep.equal(newTask);
    });

    it('returns empty array when missing topic id', () => {
      const newTask = { id: '1', label: 'task' };
      const newTopic = { id: '1', label: 'topic', tasks: [newTask] };
      const state = { topics: INITIAL_STATE.merge({ items: [newTopic] }) };
      const tasks = selectTasksFor(state)();
      expect(tasks.length).to.equal(0);
    });

    it('gets all tasks for today', () => {
      const todayTask = { id: '1', label: 'today', date: moment.utc() };
      const yesterdayTask = { id: '2', label: 'today', date: moment.utc().subtract(1, 'days') };
      const newTopic = { id: '1', label: 'topic', tasks: [todayTask, yesterdayTask] };
      const state = { topics: INITIAL_STATE.merge({ items: [newTopic] }) };
      const tasks = selectTodayTasks(state);
      expect(tasks.length).to.equal(1);
      expect(tasks[0].id).to.equal('1');
      expect(tasks[0].label).to.equal('today');
    });
  });
});
