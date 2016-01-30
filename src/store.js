import {List, Map} from 'immutable';
import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
  return createStore(reducer);
}