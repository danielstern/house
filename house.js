class House {
	constructor(){
		this.ab = class {
			constructor(name,url,probability = 1,...pings){
				this.pings = [];
			}
			name(name){
				this._name = name;
			}
			url(url){
				this.directTo(url);
			}
			directTo(url){
				this._destination = url;
			}
		};
	}
}

module.exports = new House();
