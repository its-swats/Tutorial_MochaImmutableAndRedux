import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';
import {setEntries, next, vote} from '../src/core'; 

describe ('application logic', () => {
  describe ('setEntries', () => {
    it('adds entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }))
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }))
    });
  });
  describe ('next', () => {
    it ('takes the next two entries under vote', () => {
      const state = Map({entries: List.of('Trainspotting', '28 Days Later', 'Sunshine', 'Batman')});
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine', 'Batman')
      }))
    });
  });
  describe('vote', () => {
    it ('created a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting')
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = fromJS(
        {vote: {pair: ['Trainspotting', '28 Days Later'], tally: {'Trainspotting': 3, '28 Days Later': 2}}, entries: []}
      );
      const expectedState = fromJS(
        {vote: {pair: ['Trainspotting', '28 Days Later'], tally: {'Trainspotting': 4, '28 Days Later': 2}}, entries: []}
      );
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(expectedState)
    })
  });
});