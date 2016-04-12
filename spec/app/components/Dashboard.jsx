import { expect } from 'chai'
import Dashboard from '../../../app/components/Dashboard'

describe(Dashboard, () => {
  it('confirms the export works', () => {
    expect(Dashboard).to.not.be.empty
  })
})
