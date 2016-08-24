let express = require('express');
let house = require('./../house.js');

let app = new express();
let ab = new house.ab();

ab.option()
	.url(`/option1`);

ab.option()
	.url(`/option2`);


app.use('/test', ab.middleware());
app.get('/',(req,res)=>{
	res.send(
		`
			<a target=_blank href="test">Do the test</a>;
		`
	)
})

app.get('/option1',(req,res)=>{
	res.send("You arrived at option 1");
})
.get('/option2',(req,res)=>{
	res.send("You arrived at option 2");
})
app.listen(7777,()=>{console.log("App listening on port 7777")});
