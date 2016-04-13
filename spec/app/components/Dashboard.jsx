// Neither of these may not be included or we get errors like 'undefined is
// not a function' later in our assertions. My guess is it's because we're
// using the sinon-chai library. Chai-enzyme claims that it plays well with
// other chai.js plugins, but perhaps sinon-chai doesn't? We're not even using
// sinon yet but I'm too lazy to try taking it out to prove this hypothesis.
// import { expect } from 'chai'
// import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Dashboard from '../../../app/components/Dashboard'
import React from 'react'
import { shallow, mount } from 'enzyme'
import QuoteList from '../../../app/components/QuoteList'
import ReactTestUtils from 'react-addons-test-utils'

chai.use(chaiEnzyme())

describe(Dashboard, () => {
  context('with enzyme', () => {
    it("outputs the text 'Here are the most recent quotes'", () => {
      // The following gives me a runtime error. I suspect it's a bug in chai-enzyme. So I use 'match' as a workaround.
      // expect(shallow(<Dashboard/>)).to.contain.text("Here are the most recent quotes")
      expect(shallow(<Dashboard/>)).to.have.text().match(/Here are the most recent quotes/)
    })

    it('renders HTML', () => {
      expect(shallow(<Dashboard/>)).to.contain(<p>Here are the most recent quotes</p>)
    })

    it('mounts and can find an internal component', () => {
      expect(mount(<Dashboard/>)).to.have.exactly(1).descendants(QuoteList)
    })
  })

  context("with Facebook's test utils", () => {
    it("outputs the text 'Here are the most recent quotes'", () => {
      const shallowRenderer = ReactTestUtils.createRenderer()
      shallowRenderer.render(<Dashboard/>)
      const result = shallowRenderer.getRenderOutput()
      expect(result.props.children[0].props.children).to.match(/Here are the most recent quotes/)
    })

    it('renders HTML', () => {
      const shallowRenderer = ReactTestUtils.createRenderer()
      shallowRenderer.render(<Dashboard/>)
      const result = shallowRenderer.getRenderOutput()
      // Here we can check the whole thing.
      // We must use 'deep.equal' or 'eql' because we want to compare value, not identity.
      expect(result).to.deep.equal(
        <div>
          <p>Here are the most recent quotes</p>
          <QuoteList/>
        </div>
      )
      // But there are no built in utils/helpers for "contains", so we could do something like this to mimic the above test.
      // This is more brittle than a 'contains' assertion, because we our check here considers the ORDER of the children.
      expect(result.props.children[0].type).to.equal('p')
      expect(result.props.children[0]).to.deep.equal(
        <p>Here are the most recent quotes</p>
      )
    })

    it('mounts and can find an internal component', () => {
      const dashboard = ReactTestUtils.renderIntoDocument(<Dashboard/>)
      const quoteList = ReactTestUtils.scryRenderedComponentsWithType(dashboard, QuoteList);
      expect(quoteList).to.have.length.of(1)
    })
  })
})
