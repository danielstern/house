# House, An A/B Testing Framework for Node
## The House Always Wins

## Why?
A/B Testing is great. It makes you lots of money. Everyone likes money.
![image](https://cloud.githubusercontent.com/assets/4268152/17913868/5c45e052-696b-11e6-86cb-f7cf6f6cd8b0.png)

The big boys make it seems complicated. It doesn't have to be. 

## What is A/B Testing?
Look at it this way.

Let's say you run a burger joint, Bill's Burgers.

You and your co-owner, have a disagreement, over the name of the burger special, "Super Bagel Burger." She thinks it would sell better if it was called the "Ultra Bagel Burger."

This point is bitterly debated for many long years. Finally, you have an idea. 

Half the customers who come in will be offered the "Super Bagel Burger."
The other half will be offered the "Ultra Bagel Burger."

You tally up the exact number of burgers each customer group buys. After 1,000 customers, you see that 352/500 have bought Super Bagel Burgers, and 256/500 have bought Ultra Bagel Burgers. You now know the Super Bagel Burger does sell better, and can prove it.

A/B testing when applied to web-based enterprises works basically the same way.



## How to Use
It works like this,

```
let express = require(`express`);
let ab = require(`house`).ab;
let test = new ab();
let option1 = test.option();
let option2 = test.option();

option1
  .name(`main site`)
  .directTo(`http://site.com?a=1`)
  .probability(5)
  .ping(`http://google.analytics/etc`);
  
option2
  .name(`the thing we're testing site`)
  .directTo(`http://site.com?a=2`)
  .probability(1)
  .ping(`http://google.analytics/etc`);
  
express.use(`/myTest`,test);
```

