import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';
import makeStore from '../src/store'

describe('store', () => {
  it('is a redux store with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());
  });

  it('accepts and updates dispatches', () => {
    const store = makeStore();
    const expectedState = fromJS(
      {entries: ['Hackers', 'Batman']}
    );
    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Hackers', 'Batman']
    });
    expect(store.getState()).to.equal(expectedState);
  });
});