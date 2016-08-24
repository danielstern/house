let d3 = require('d3');
let chance = require('chance');
class Option {
	constructor(name,url,probability = 1,...pings){
		this.URLsToPingOn = [];
		this.name(name);
		this.url(url);
		this.probability(probability);
	}
	url(url){
		if (!url) {
			return this._destination;
		}
		this._destination = url;
		return this;
	}
	name(name){
		if (!name) {
			return this._name;
		}
		this._name = name;
		return this;
	}
	probability(odds) {
		if (odds === undefined) {
			return this._odds;
		}
		this._odds = odds;
	}
	ping(...urls){
		// who WOULDN'T want to implement this at some point
	}
}

class AB {
	constructor(name,url,probability = 1,...pings){
		this.options = [];
	}
	option(...args){
		let option = new Option(...args);
		this.options.push(option);
		return option;
	}
	name(name){
		this._name = name;
		return this;
	}
	roll(){
		if (this.options.length == 0) {
			throw new error("There are no options available");
		}

		if (this.options.length == 1) {
			return this.options[0];
		}

		if (this.options.some(o=>o.probability()===undefined)){
			throw new Error("Unable to roll - an option has undefined probability");
		}

		let roll = new chance().weighted(this.options,this.options.map(o=>o.probability()));
		return roll;

		//let totalProbability = d3.sum(this.options.map(g=>g.probability()));
		//let roll = d3.randomUniform(0,totalProbability);
		//console.log("Roll?",roll());



		//throw new Error("Not implemented yet");;
	}
	middleware(){
		return (req,res,next)=>{
			let option = this.roll();
			let url = option.url();
			res.redirect(url);
		}
	}
}

class House {
	constructor(){
		this.ab = AB;
	}
}

module.exports = new House();
