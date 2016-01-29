import {next, vote, setEntries} from './core';

export default function reducer(state, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      console.log(action)
      console.log(state)
      return setEntries(state, action.entries);
      break;
    case 'NEXT':
      return next(state);
      break;
    case 'VOTE':
      return vote(state, action.vote);
      break;
  }

}