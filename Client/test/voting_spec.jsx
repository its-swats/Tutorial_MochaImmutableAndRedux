import React from 'react/addons';
import Voting from '../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

describe ('voting', () => {
  it('renders in to document', () => {
    const component = renderIntoDocument(
      <Voting pair={['Batman', 'Hackers']} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Batman');
    expect(buttons[1].textContent).to.equal('Hackers');
  });

  it('invokes a callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;
    const component = renderIntoDocument(
      <Voting pair={['Batman', 'Hackers']} vote={vote} />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('Batman');
  });

  it('disables voting buttons after voting', () => {
    const component = renderIntoDocument(
      <Voting pair={['Batman', 'Hackers']} hasVoted='Hackers' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });
});