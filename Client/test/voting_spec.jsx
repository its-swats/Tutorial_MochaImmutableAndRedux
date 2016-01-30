import React from 'react/addons';
import Voting from '../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag} = React.addons.TestUtils;

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
});