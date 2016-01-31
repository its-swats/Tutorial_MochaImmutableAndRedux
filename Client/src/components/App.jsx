import React from 'react';
import {Map, List} from 'immutable';

const pair = List.of('Hackers', 'Batman');
const tally = Map({'Hackers': 12, 'Batman': 7}) ;

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {pair: pair, tally: tally});
  }
})