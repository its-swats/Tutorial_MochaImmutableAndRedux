import React from 'react';
import ReactDOM from 'react-dom';
import {VotingContainer} from './components/Voting';
import Router, {Route} from 'react-router';
import App from './components/App';
import ResultsContainer from './components/Results';
import reducer from './reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Hackers', 'Batman'],
      tally: {'Hackers': 5}
    }
  }
})

const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />,
  <Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>, 
  </Provider>,
  document.getElementById('app')
);