// Copyright (c)2025 Quinn Michaels
// Networks Deva test file

const {expect} = require('chai')
const NetworksDeva = require('./index.js');

describe(NetworksDeva.me.name, () => {
  beforeEach(() => {
    return NetworksDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(NetworksDeva).to.be.an('object');
    expect(NetworksDeva).to.have.property('agent');
    expect(NetworksDeva).to.have.property('vars');
    expect(NetworksDeva).to.have.property('listeners');
    expect(NetworksDeva).to.have.property('methods');
    expect(NetworksDeva).to.have.property('modules');
  });
})
