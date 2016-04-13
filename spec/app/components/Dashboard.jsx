// Neither of these may not be included or we get errors like 'undefined is
// not a function' later in our assertions. My guess is it's because we're
// using the sinon-chai library. Chai-enzyme claims that it plays well with
// other chai.js plugins, but perhaps sinon-chai doesn't? We're not even using
// sinon yet but I'm too lazy to try taking it out to prove this hypothesis.
// import { expect } from 'chai'
// import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import Dashboard from '../../../app/components/Dashboard'
import QuoteCollection from '../../../app/components/QuoteCollection'
import Quote from '../../../app/components/Quote'
import PhraseCollection from '../../../app/components/PhraseCollection'
import Phrase from '../../../app/components/Phrase'
import TestUtils from 'react-addons-test-utils'
import _quotes from '../../../fixtures/quotes'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

chai.use(chaiEnzyme())

describe('Dashboard', () => {



  // Here's how we would have to do things without Enzyme

  context("with Facebook's test utils", () => {
    it("outputs the text 'Here are the most recent quotes'", () => {
      const shallowRenderer = TestUtils.createRenderer()
      shallowRenderer.render(<Dashboard/>)
      const result = shallowRenderer.getRenderOutput()
      expect(result.props.children[0].props.children).to.match(/Here are the most recent quotes/)
    })

    it('renders HTML', () => {
      const shallowRenderer = TestUtils.createRenderer()
      shallowRenderer.render(<Dashboard/>)
      const result = shallowRenderer.getRenderOutput()
      // Here we can check the whole thing.
      // We must use 'deep.equal' or 'eql' because we want to compare value, not identity.
      expect(result).to.deep.equal(
        <div>
          <p>Here are the most recent quotes</p>
          <p><a onClick={undefined} ref='createQuoteLink'>Create a new quote</a></p>
          <QuoteCollection quotes={undefined} onLikeQuote={undefined}/>
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
      const dashboard = TestUtils.renderIntoDocument(<Dashboard/>)
      const quoteCollection = TestUtils.scryRenderedComponentsWithType(dashboard, QuoteCollection);
      expect(quoteCollection).to.have.length.of(1)
    })

    it('renders a full section of DOM', () => {
      const dashboard = TestUtils.renderIntoDocument(<Dashboard quotes={_quotes}/>)
      const quoteCollection = TestUtils.scryRenderedComponentsWithType(dashboard, QuoteCollection)
      expect(quoteCollection).to.have.length.of(1)
    })

    it('renders a full section of DOM, this time diving deeper into the subcomponents', () => {
      const dashboard = TestUtils.renderIntoDocument(<Dashboard quotes={_quotes}/>)
      const quoteCollection = TestUtils.scryRenderedComponentsWithType(dashboard, QuoteCollection)
      expect(quoteCollection).to.have.length.of(1)
      const quotes = TestUtils.scryRenderedComponentsWithType(quoteCollection[0], Quote)
      expect(quotes).to.have.length.of(3)
      const phraseCollection = TestUtils.scryRenderedComponentsWithType(quotes[2], PhraseCollection)
      expect(phraseCollection).to.have.length.of(1)
      const phrases = TestUtils.scryRenderedComponentsWithType(phraseCollection[0], Phrase)
      expect(phrases).to.have.length.of(2)
      expect(phrases[0].props.phrase.text).to.equal("Everyone has an irrational fear")
    })

    it("handles clicking 'Create new quote' button", () => {
      const handleCreateLink = sinon.spy()
      const dashboard = TestUtils.renderIntoDocument(<Dashboard quotes={_quotes} onCreateLink={handleCreateLink}/>)
      TestUtils.Simulate.click(dashboard.refs.createQuoteLink)
      expect(handleCreateLink).to.have.been.called
    })

    it("handles clicking 'Like'", () => {
      const handleLikeQuote = sinon.spy()
      const dashboard = TestUtils.renderIntoDocument(<Dashboard quotes={_quotes} onLikeQuote={handleLikeQuote}/>)
      const quoteCollection = TestUtils.scryRenderedComponentsWithType(dashboard, QuoteCollection)
      expect(quoteCollection).to.have.length.of(1)
      const quotes = TestUtils.scryRenderedComponentsWithType(quoteCollection[0], Quote)
      expect(quotes).to.have.length.of(3)
      const quote = quotes[2]
      TestUtils.Simulate.click(quote.refs.likeLink)
      expect(handleLikeQuote).to.have.been.called
    })
  })




  // Now compare the above to using the Enzyme library. It's easier to write, reason about, and read back.

  context("with enzyme", () => {
    it('mounts and can find an internal component', () => {
      expect(mount(<Dashboard/>).contains(
        <div>
          <p>Here are the most recent quotes</p>
          <p><a onClick={undefined}>Create a new quote</a></p>
          <QuoteCollection quotes={undefined} onLikeQuote={undefined}/>
        </div>
      )).to.equal(true)
    })

    it("outputs the text 'Here are the most recent quotes'", () => {
      // The following gives me a runtime error. I suspect it's a bug in chai-enzyme. So I use 'match' as a workaround.
      // expect(shallow(<Dashboard/>)).to.contain.text("Here are the most recent quotes")
      expect(shallow(<Dashboard/>)).to.have.text().match(/Here are the most recent quotes/)
    })

    it('renders HTML', () => {
      expect(shallow(<Dashboard/>)).to.contain(<p>Here are the most recent quotes</p>)
    })

    it('renders a full section of DOM', () => {
      const dashboard = mount(<Dashboard quotes={_quotes}/>)
      const quoteCollection = dashboard.find(QuoteCollection)
      expect(quoteCollection).to.have.length.of(1)
      const quotes = quoteCollection.at(0).find(Quote)
      expect(quotes).to.have.length.of(3)
      const phraseCollection = quotes.at(2).find(PhraseCollection)
      expect(phraseCollection).to.have.length.of(1)
      const phrases = phraseCollection.at(0).find(Phrase)
      expect(phrases).to.have.length.of(2)
      expect(phrases.at(0).props().phrase.text).to.equal("Everyone has an irrational fear")
    })

    it('renders a full section of DOM, functional style without all the intermediate stuff', () => {
      const dashboard = mount(<Dashboard quotes={_quotes}/>)
      expect(dashboard.find(QuoteCollection).at(0).find(Quote).at(2).find(PhraseCollection).at(0).find(Phrase).at(0).props().phrase.text).to.equal("Everyone has an irrational fear")
    })
  })
})
