
const colorSet = [
	'#4ae050',
	// '#d9d9d9',
	'#1aaae8',
	'#2c31b6',
	'#f9c848',
	'#f9a825',
	'#f16c4d',
]

/**
 * Returns a random color from the color set.
 */
export const randomColorSet = ()=>{
	return colorSet[Math.floor(Math.random() * colorSet.length)];
}

