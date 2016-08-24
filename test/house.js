let house = require('../house.js');
let assert = require('chai').assert;
let expect = require('chai').expect;

describe("The House",()=>{
	it("always wins",()=>{
		assert.isOk(`Ace of Spades`);
	});

	it("should have a property called AB",()=>{
		expect(house.ab).to.be.defined;
	})
});
