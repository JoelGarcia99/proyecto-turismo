import React from 'react';

/**
 * Loads all images in a specified directory.
 *
 * @param {string} source - The path to the directory.
 * @returns {array} - An array of images.
 */
// TODO: this is not working
export const loadAllImagesFromSource = (source)=>{

	function importAll(r) {
		return r.keys().map(r);
	}

	const images = importAll(require.context(source, false, /\.(png|jpe?g|svg)$/));

	return images;
}
