let express = require('express');
let house = require('./../house.js');

let app = new express();
let ab = new house.ab();

ab.option()
	.url(`/why`);

ab.option()
	.url(`/what`);

app.use('/test', ab.middleware());

app.listen(7777);
