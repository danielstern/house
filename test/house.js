let house = require('../house.js');
let assert = require('chai').assert;
let should = require('should');
let expect = require('chai').expect;
let express = require('express');
let supertest = require('supertest');

describe("The House",()=>{
	it("Always Wins",()=>{
		assert.isOk(`Ace of Spades`);
	});

	it("should have a property called AB",()=>{
		expect(house.ab).not.to.be.undefined;
		expect(new house.ab()).not.to.be.undefined;
	});

});

describe("The AB Test",()=>{

	it('should be express middleware',()=>{
		try {
			let ab = new house.ab();
			let app = new express();
			app.use('/ab',ab.middleware());
		} catch (e) {
			should.fail(e);
		}

	})

	it("should return an option object when option is called",()=>{
		let ab = new house.ab();
		let option = ab.option();
		expect(option).not.to.be.undefined;
	});

	it("should store any created options in an array",()=>{
		let ab = new house.ab();
		expect(ab.options.length).to.equal(0);
		let option1 = ab.option();
		expect(ab.options.length).to.equal(1);
		expect(ab.options[0]).to.equal(option1);
		let option2 = ab.option();
		expect(ab.options.length).to.equal(2);
		expect(ab.options[0]).to.equal(option1);
		expect(ab.options[1]).to.equal(option2);
	});

	describe("the AB Roll Function",()=>{
		it("should throw an error if there are no options",()=>{
			let ab = new house.ab();
			expect(ab.options.length).to.equal(0);
			expect(()=>{
				ab.roll();
			}).to.throw();

		})
		it("should always return an option, provided one has been configured",()=>{
			let ab = new house.ab();
			let option = ab.option(`an option!`);
			expect(ab.roll.bind(ab)).not.to.throw();
			expect(ab.roll()).to.equal(option);
		});
		it("should, given enough requests, eventually return all options with non-zero probability",()=>{
			let ab = new house.ab();
			let options = [];
			options.push(ab.option(`that sounds really boring`,`what?`,10));
			options.push(ab.option(`who - who's that guy?`,`oh`,10));
			options.push(ab.option(`wow!`,`nice`,1000));
			options.push(ab.option(`we're in a computer`,`great`,10));

			let max_attempts = Math.pow(2,16);
			let attempt = 0;
			let attemptResults = [];
			while (attempt++ < max_attempts) {
				let res = ab.roll();
				attemptResults.push(res);
				if (options.every(o=>attemptResults.includes(o))) {
					break;
				}
			}
			expect(options.every(o=>attemptResults.includes(o))).to.be.true;
		});

		it("should never return an option with 0 probability",()=>{
			let ab = new house.ab();

			let option1 = ab.option(`that sounds really boring`,`what?`,0);
			let option2 = ab.option(`who - who's that guy?`,`oh`,1);
			let option3 = ab.option(`wow!`,`nice`,1);

			let max_attempts = Math.pow(2,8);
			let attempt = 0;
			let attemptResults = [];

			while (attempt++ < max_attempts) {
				let res = ab.roll();
				if (!attemptResults.includes(res)) {
					attemptResults.push(res);
				}

			}
			expect(attemptResults).not.to.include(option1);
			expect(attemptResults).to.include(option2);
			expect(attemptResults).to.include(option3);
		});
	});

	it("should always redirect the corresponding express route to at least one of the urls",(done)=>{
		let app = new express();
		let ab = new house.ab();
		let option = ab.option(`An option`,`/test`);
		app.use('/',ab.middleware());

		supertest(app)
		.get('/')
		.expect(302)
		.expect('Location', '/test')
		.end(done)

	});
	xit("should, given enough requests, eventually route to all urls with non-zero probability"); // not really necessary
});

describe("The Option",()=>{
	it("should change the name property",()=>{
		let ab = new house.ab();
		let option = ab.option();
		expect(option.name()).to.be.undefined;
		option.name("main test");
		expect(option.name()).to.equal("main test");
	});
	it("should change the url property",()=>{
		let ab = new house.ab();
		let option = ab.option();
		expect(option.url()).to.be.undefined;
		option.url("//jokes");
		expect(option.url()).to.equal("//jokes");
	});
	xit("should add another url to the ping property"); // this doesn't really need to be iplemented now
	it("should change the odds",()=>{
		let ab = new house.ab();
		let option = ab.option();
		expect(option.probability()).to.equal(1);
		option.probability(777);
		expect(option.probability()).to.equal(777);
	});
	it("should have a constructor shortcut",()=>{
		let ab = new house.ab();
		let option = ab.option("my option","http://youtube.com",2);
		expect(option.name()).to.equal("my option");
		expect(option.url()).to.equal("http://youtube.com");
		expect(option.probability()).to.equal(2);
	});
})
