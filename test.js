const test = require('tape')
const oneToManyZip = require('./')

test(`basic example`, t => {
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

	t.deepEqual(output, expectedOutput)

	t.end()
})

test(`Handles parents without matching children`, t => {
	const output = oneToManyZip([ 1, 2, 3, 4 ], [ 1, 3, 3, 3, 3, 3 ], (a, b) => a === b)
	const expected = [{
		one: 1,
		many: [ 1 ]
	}, {
		one: 2,
		many: []
	}, {
		one: 3,
		many: [ 3, 3, 3, 3, 3 ]
	}, {
		one: 4,
		many: []
	}]

	t.deepEqual(output, expected)

	t.end()
})

test(`Throws if there are children without a match`, t => {
	t.throws(() => oneToManyZip([ 1, 2 ], [ 1, 2, 2, 3 ], (a, b) => a === b))

	t.end()
})

test(`invalid inputs`, t => {
	t.throws(() => oneToManyZip())
	t.throws(() => oneToManyZip([]))
	t.throws(() => oneToManyZip([], () => true))
	t.throws(() => oneToManyZip({}, {}, () => true))

	t.end()
})
