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
})








