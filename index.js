module.exports = function oneToManyZip(oneArray, manyArray, compareFn) {
	assert(Array.isArray(oneArray), 'Expected first argument to be an array')
	assert(Array.isArray(manyArray), 'Expected second argument to be an array')
	assert(typeof compareFn === 'function', 'Expected third argument to be a function')

	const output = []
	var manyIndex = 0
	for (var oneIndex = 0; oneIndex < oneArray.length; ++oneIndex) {
		const one = oneArray[oneIndex]
		const many = []
		output.push({
			one,
			many
		})

		while (manyIndex < manyArray.length && compareFn(one, manyArray[manyIndex])) {
			many.push(manyArray[manyIndex])
			manyIndex++
		}
	}

	if (manyIndex < manyArray.length) {
		throw new Error(`${manyArray.length - manyIndex} unmatched elements`)
	}

	return output
}

function assert(value, message) {
	if (!value) {
		throw new Error(message)
	}
}
