# House, An A/B Testing Framework for Node

![logo-smaller](https://cloud.githubusercontent.com/assets/4268152/17970173/6e02d708-6aa3-11e6-89da-fe56c5dfe90a.png)

## The House Always Wins

## Why?
A/B Testing is great. It makes you lots of money. Everyone likes money.


The mega-geniuses out there make it seem complicated. It doesn't have to be.

## What is A/B Testing?
Look at it this way.

Let's say you run a burger joint, Bill's Burgers.

You and your co-owner, have a disagreement, over the name of the burger special, "Super Bagel Burger." She thinks it would sell better if it was called the "Ultra Bagel Burger."

This point is bitterly debated for many long years. Finally, you have an idea.

Half the customers who come in will be offered the "Super Bagel Burger."
The other half will be offered the "Ultra Bagel Burger."

You tally up the exact number of burgers each customer group buys. After 1,000 customers, you see that 352/500 have bought Super Bagel Burgers, and 256/500 have bought Ultra Bagel Burgers. You now know the Super Bagel Burger does sell better (37.5% better!), and you can prove it.

A/B testing when applied to web-based enterprises works basically the same way.

## Example Usage
In order to use this module, you have to import the `house` module and create a new `ab` test, then set that test up as a route in Express. Here's a working example...

```javascript
let express = require('express');
let house = require('housejs');

let app = new express();
let ab = new house.ab();
let port = process.env.PORT || 7777;

ab.option()
	.name(`Group A - elite controller offer page (multiple)`)
	.url(`https://www.amazon.com/gp/offer-listing/B00ZDNNRB8`)
	.probability(1);

ab.option()
	.name(`Group B - elite controller main page`)
	.url(`https://www.amazon.com/dp/B00ZDNNRB8`)
	.probability(1);


app.use('/elite-controller', ab.middleware());
app.get('/',(req,res)=>{
	res.send(
		`
			<a target=_blank href="elite-controller">Do the test</a>;
		`
	)
})

app.listen(port,()=>{console.log(`App listening on port ${port}`)});
```

## What is it?
House.js is basically express Middleware that randomizes the outcome. It's perfect for A/B testing and easy to use. There is support (not yet implemented) for sending additional requests to analytics endpoints.


## Running Tests
`npm test`
