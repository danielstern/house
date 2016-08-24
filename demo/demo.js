let express = require('express');
let house = require('./../house.js');

let app = new express();
let ab = new house.ab();
let port = process.env.port || 7777;

ab.option()
	.name(`Group A - elite controller offer page (multiple)`)
	.url(`https://www.amazon.com/gp/offer-listing/B00ZDNNRB8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00ZDNNRB8&linkCode=am2&tag=the-tech-reviewer-a-20&linkId=d3c4159691eac2c771d964aa7f295a29`)
	.probability(1);

ab.option()
	.name(`Group B - elite controller main page`)
	.url(`https://www.amazon.com/dp/B00ZDNNRB8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00ZDNNRB8&linkCode=am2&tag=the-tech-reviewer-b-20&linkId=e57472e5aec289acc8bc472f9322e8eb`)
	.probability(1);


app.use('/elite-controller', ab.middleware());
app.get('/',(req,res)=>{
	res.send(
		`
			<a target=_blank href="elite-controller">Do the test</a>; 
		`
	)
})

app.get('/option1',(req,res)=>{
	res.send("You arrived at option 1");
})
.get('/option2',(req,res)=>{
	res.send("You arrived at option 2");
})
app.listen(port,()=>{console.log(`App listening on port ${port}`)});
