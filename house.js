class Option {
	constructor(name,url,probability = 1,...pings){
		this.URLsToPingOn = [];
	}
	url(url){
		this.directTo(url);
	}
	directTo(url){
		this._destination = url;
	}
}

class AB {
	constructor(name,url,probability = 1,...pings){
		this.options = [];
	}
	option(){
		let option = new Option();
		this.options.push(option);
		return option;
	}
	name(name){
		this._name = name;
		return this;
	}
}

class House {
	constructor(){
		this.ab = AB;
	}
}

module.exports = new House();
