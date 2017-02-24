A custom array-combining/zipping function.

Given two sorted arrays whose elements have a one-to-many relationship, and a function that returns `true` when given two matching elements, efficiently return a new array with the matching elements combined.

<!--js
const oneToManyZip = require('./')
-->

```js
const parents = [
	{ name: 'cool dad', coolness: 3 },
	{ name: 'cool cat', coolness: 7 }
]

const children = [
	{ name: 'bobby', coolness: 1 },
	{ name: 'billy', coolness: 3 },
	{ name: 'bubba', coolness: 5 },
	{ name: 'benji', coolness: 6 }
]

const output = oneToManyZip(parents, children, (parent, child) => parent.coolness >= child.coolness)

const expectedOutput =  [
	{
		one: { name: 'cool dad', coolness: 3 },
		many: [
			{ name: 'bobby', coolness: 1 },
			{ name: 'billy', coolness: 3 }
		]
	}, {
		one: { name: 'cool cat', coolness: 7 },
		many: [
			{ name: 'bubba', coolness: 5 },
			{ name: 'benji', coolness: 6 }
		]
	}
]

output // => expectedOutput
```

## `oneToManyZip(parentArray, childrenArray, compareFn)`

Returns a new array with `parentArray.length` elements.

Iterates over all the elements in `parentArray`, and calls `compareFn(parentArray[i], childrenArray[j])`.

`compareFn` should return true if the child element belongs to the parent element.

The returned array will have an object for each element in `parentArray`.  The object will have two properties:

- `one`: the element from `parentArray`
- `many`: an array of matching elements from `childrenArray`

Throws an error if there are any `childrenArray` elements left after iterating over all the elements in `parentArray`.

Don't forget, both arrays must be sorted before passing them in!

## License

[WTFPL](http://wtfpl2.com)
