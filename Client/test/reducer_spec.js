import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Hackers', 'Batman'),
          tally: Map({'Hackers': 7})
        })
      })
    };
    const nextState = reducer(initialState, action);
    const expectedState = fromJS({
      vote: {
        pair: ['Hackers', 'Batman'],
        tally: {'Hackers': 7}
      }
    })
    expect(nextState).to.equal(expectedState);
  })

  it('handles SET_STATE with plain JS', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Hackers', 'Batman'],
          tally: {'Hackers': 7}
        }
      }
    };
    const nextState = reducer(initialState, action);
    const expectedState = fromJS({
      vote: {
        pair: ['Hackers', 'Batman'],
        tally: {'Hackers': 7}
      }
    })
    expect(nextState).to.equal(expectedState);
  });

  it('handles a blank initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Hackers', 'Batman'],
          tally: {'Hackers': 7}
        }
      }
    };
    const nextState = reducer(undefined, action);
    const expectedState = fromJS({
      vote: {
        pair: ['Hackers', 'Batman'],
        tally: {'Hackers': 7}
      }
    });
    expect(nextState).to.equal(expectedState);
  });

  it('handles VOTE and sets hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Hackers', 'Batman'],
        tally: {Hackers: 5}
      }
    });
    const action = {type: 'VOTE', vote: 'Hackers'};
    const nextState = reducer(state, action);
    const expectedState = fromJS({
      vote: {
        pair: ['Hackers', 'Batman'],
        tally: {Hackers: 5}
      },
      hasVoted: 'Hackers'
    })
    expect(nextState).to.equal(expectedState);
  });

  it('does not work on an invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Hackers', 'Batman'],
        tally: {Hackers: 5}
      }
    });
    const action = {type: 'VOTE', entry: 'Deadpool'};
    const nextState = reducer(state, action);
    const expectedState = fromJS({
      vote: {
        pair: ['Hackers', 'Batman'],
        tally: {Hackers: 5}
      }
    });
    expect(nextState).to.equal(expectedState);
  })

  it('removes voted state when pair changes', () => {
    const state = fromJS({
      vote: {
        pair: ['Hackers', 'Batman'],
        tally: {Hackers: 5}
      },
      hasVoted: 'Hackers'
    });
    const action = {type: 'SET_STATE', state: {vote:{pair:['Sunshine', 'Deadpool']}}};
    const nextState = reducer(state, action);
    const expectedState = fromJS({vote: {pair:['Sunshine', 'Deadpool']}});
    expect(nextState).to.equal(expectedState);
  })
})








