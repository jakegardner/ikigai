/* eslint-disable import/no-extraneous-dependencies, no-undef */
import { expect } from 'chai';

import reducer, {
  INITIAL_STATE,
  addTopic,
  deleteTopic,
  addTask,
  deleteTask,
  selectTasksFor,
} from './duck';

describe('topics', () => {
  describe('reducer', () => {
    it('returns default state', () => {
      expect(reducer()).to.deep.equal(INITIAL_STATE);
    });

    it('adds new topic', () => {
      const newTopic = { id: '1', name: 'topic' };
      const state = reducer(INITIAL_STATE, addTopic(newTopic));
      expect(state.items[0]).to.deep.equal(newTopic);
    });

    it('deletes topic', () => {
      const newTopic = { id: '1', name: 'topic' };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        deleteTopic({ id: '1' }),
      );
      expect(state.items.length).to.equal(0);
    });

    it('does not delete unspecified topic', () => {
      const newTopic = { id: '1', name: 'topic' };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        deleteTopic({ id: '2' }),
      );
      expect(state.items.length).to.equal(1);
      expect(state.items[0].id).to.equal('1');
    });

    it('adds new task', () => {
      const newTopic = { id: '1', name: 'topic', tasks: [] };
      const newTask = { id: '1', name: 'task' };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        addTask({ topicId: '1', task: newTask }),
      );
      expect(state.items[0].tasks[0]).to.deep.equal(newTask);
    });

    it('deletes task', () => {
      const newTask = { id: '1', name: 'task' };
      const newTopic = { id: '1', name: 'topic', tasks: [newTask] };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        deleteTask({ topicId: '1', taskId: '1' }),
      );
      expect(state.items[0].tasks.length).to.equal(0);
    });

    it('does not delete unspecified task', () => {
      const newTask = { id: '1', name: 'task' };
      const newTopic = { id: '1', name: 'topic', tasks: [newTask] };
      const state = reducer(
        INITIAL_STATE.merge({ items: [newTopic] }),
        deleteTask({ topicId: '1', taskId: '2' }),
      );
      expect(state.items[0].tasks.length).to.equal(1);
      expect(state.items[0].tasks[0]).to.deep.equal(newTask);
    });
  });

  describe('selectors', () => {
    it('gets tasks for topic', () => {
      const newTask = { id: '1', name: 'task' };
      const newTopic = { id: '1', name: 'topic', tasks: [newTask] };
      const state = { topics: INITIAL_STATE.merge({ items: [newTopic] }) };
      const tasks = selectTasksFor(state)('1');
      expect(tasks[0]).to.deep.equal(newTask);
    });

    it('returns empty array when missing topic id', () => {
      const newTask = { id: '1', name: 'task' };
      const newTopic = { id: '1', name: 'topic', tasks: [newTask] };
      const state = { topics: INITIAL_STATE.merge({ items: [newTopic] }) };
      const tasks = selectTasksFor(state)();
      expect(tasks.length).to.equal(0);
    });
  });
});
