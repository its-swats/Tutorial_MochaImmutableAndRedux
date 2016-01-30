import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting'

const pair = ['Batman', 'Hackers'];

ReactDOM.render(<Voting winner='Hackers' pair={pair} hasVoted='Hackers' />, document.getElementById('app'));