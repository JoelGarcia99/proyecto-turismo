
/**
 * this will remove all the null, undefined, or empty fields
 * from the [data] object in order to do not send them in 
 * the request body
 */
export const cleanUndefinedFields = (data) => {
	// making a copy of the data
	const newData = {...data};

	// removing null or empty fields from the object
	for (let key in newData) {
		if (newData[key] === null || newData[key] === "") {
			delete newData[key];
		}
	}

	return newData;
}
