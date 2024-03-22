# dadlaughbutton-api
The API for [Dad Laugh Button](http://dadlaughbutton.com/)  
Get the count from [here](https://dadlaughbutton.stats100.xyz)

# JavaScript Example
```js
fetch('https://dadlaughbutton.stats100.xyz')
  .then(res => { return res.json() })
  .then(data => {
    console.dir(data, { depth: null })
  })
```
