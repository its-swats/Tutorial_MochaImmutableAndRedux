import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe ('reducer', () => {
  it('Handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Batman', 'Hackers']};
    const nextState = reducer(initialState, action);
    const expectedState = fromJS(
      {entries: ['Batman', 'Hackers']}
    );
    expect(nextState).to.equal(expectedState);
  });

  it('Handles NEXT', () => {
    const initialState = fromJS(
      {entries: ['Batman', 'Hackers']}
    );
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    const expectedState = fromJS(
      {vote: {pair: ['Batman', 'Hackers']}, entries: []}
    );
    expect(nextState).to.equal(expectedState);
  });

  it('Handles VOTE', () => {
    const initialState = fromJS(
      {vote: {pair: ['Batman', 'Hackers'], tally: {'Batman': 5, 'Hackers': 7}},
       entries: []}
    );
    const action = {type: 'VOTE', vote: 'Batman'};
    const nextState = reducer(initialState, action);
    const expectedState = fromJS(
      {vote: {pair: ['Batman', 'Hackers'], tally: {'Batman': 6, 'Hackers': 7}},
       entries: []}
    )
    expect(nextState).to.equal(expectedState);
  })

  it('Handles undefined type', () => {
    const initialState = Map();
    const action = {type: 'undefined'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(initialState);
  })

  it('Has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Batman', 'Hackers']};
    const nextState = reducer(undefined, action);
    const expectedState = fromJS(
      {entries: ['Batman', 'Hackers']}
    );
    expect(nextState).to.equal(expectedState);
  });
})