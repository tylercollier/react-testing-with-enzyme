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

chai.use(chaiEnzyme())

describe(Dashboard, () => {
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
