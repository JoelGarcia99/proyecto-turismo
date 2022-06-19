const {ObjectId} = require('mongodb');
const sanitizeHtml = require('sanitize-html');

class PuntoTuristico {

  /**
   * @param {object} params This is a set of params to store on DB
   **/
  constructor(params, res) {
    this.params = params;

    delete this.params._id;

    if(!this.params.name) {
      return res.status(400).json({
	message: "El nombre es requerido"
      });
    }
  }

  /**
   * This method will return a set of params to store on DB
   *
   * @return {object} params
   **/
  save() {
    // raw params
    const {
      name, address, slug, category,
      allow_reservation, is_maravilla,
      presentation_video, description,
      short_description, guides,
      main_image
    } = this.params;

    // Sanitizing HTML for description
    let processed_description = sanitizeHtml(description);
	let processed_guides = guides.map(guide => ObjectId(guide));

    // processed params
    return {
      name, address, slug, category,
      allow_reservation, is_maravilla,
      presentation_video, description: processed_description,
		short_description, guides: processed_guides, main_image
    };
  }
}

module.exports = PuntoTuristico;
