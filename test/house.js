let house = require('../house.js');
let assert = require('chai').assert;
let should = require('should');
let expect = require('chai').expect;
let express = require('express');

describe("The House",()=>{
	it("always wins",()=>{
		assert.isOk(`Ace of Spades`);
	});

	it("should have a property called AB",()=>{
		expect(house.ab).not.to.be.undefined;
		expect(new house.ab()).not.to.be.undefined;
		//expect(house.ab).to.be.a.function();
	});

	it('should be express middleware',()=>{
		try {
			let ab = new house.ab();
			let app = new express();
			app.use('/ab',ab);
		} catch (e) {
			should.fail(e);
		}

	})
});

describe("The AB Test",()=>{
	it("should return an option object when option is called");
	it("should store any created options in an array");
	it("should correctly route urls");
});

describe("The Option",()=>{
	it("should change the name property");
	it("should change the url property");
	it("should change the direct to property");
	it("should add another url to the ping property");
})
