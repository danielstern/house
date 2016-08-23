# House, An A/B Testing Framework for Node
## The House Always Wins

## Why?
A/B Testing is great. It makes you lots of money. Everyone likes money.
![image](https://cloud.githubusercontent.com/assets/4268152/17913868/5c45e052-696b-11e6-86cb-f7cf6f6cd8b0.png)

The big boys make it seems complicated. It doesn't have to be. 

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
