import React from 'react/addons';
import {List, Map} from 'immutable';
import Results from '../src/components/Results';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = React.addons.TestUtils;

describe ('results', () => {
  it('renders entries with vote count or zero', () => {
    const pair = List.of('Hackers', 'Batman');
    const tally = Map({'Hackers': 10});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry')
    const [hack, bat] = entries.map(e => e.textContent);
    expect(entries.length).to.equal(2);
    expect(hack).to.contain('Hackers');
    expect(bat).to.contain('Batman');
    expect(hack).to.contain('10');
    expect(bat).to.contain('0');
  });

  it('invokes the Next callback when next is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const pair = List.of('Hackers', 'Batman');
    const component = renderIntoDocument(
      <Results pair={pair} tally={Map()} next={next} />
    )
    Simulate.click(React.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner='Hackers' pair={['Hackers', 'Batman']} tally={Map()} />
    )
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Hackers');
  });
})