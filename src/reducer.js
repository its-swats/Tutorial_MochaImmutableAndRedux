import {next, vote, setEntries, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      //The 2nd param is the VALUE for 'vote', we pass that in to vote() as voteState
      return state.update('vote', voteState => vote(voteState, action.vote))
      // return state.update('vote', function(voteState) {
      //   return vote(voteState, action.vote);
      // })
  }
  return state;
}
