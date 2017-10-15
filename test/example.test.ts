import { expect } from 'chai';

import { add } from 'src/adder';

describe("example", function() {
  it("should add numbers", function() {
    expect(add(2, 2)).to.equal(4);
  });

  it("should subtract numbers", function() {
    expect(add(2, 0)).to.equal(2);
  });
});