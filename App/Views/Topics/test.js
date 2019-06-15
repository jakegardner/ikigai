/* eslint-disable import/no-extraneous-dependencies, no-undef */
import { expect } from 'chai';

import reducer, {
  INITIAL_STATE,
  addTopic,
  deleteTopic,
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
  });
});
