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

    it ('puts the winner back in to rotation', () => {
      const state = fromJS(
        {vote: {pair: ['Trainspotting', '28 Days Later'], tally: {'Trainspotting': 4, '28 Days Later': 2}}, entries: List.of('Sunshine', '127 Hours', 'Batman')}
        );
      const expectedState = fromJS (
        {vote: {pair: ['Sunshine', '127 Hours']}, entries: List.of('Batman', 'Trainspotting')}
        );
      const nextState = next(state);
      expect(nextState).to.equal(expectedState);
    })

    it ('sets a winner when only one is left', () => {
      const state = fromJS(
        {vote: {pair: ['Trainspotting', 'Batman'], tally: {'Trainspotting': 1, 'Batman': 5}}, entries: List()}
      )
      const expectedState = fromJS(
        {winner: 'Batman'}
      )
      const nextState = next(state);
      expect(nextState).to.equal(expectedState);
    })

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