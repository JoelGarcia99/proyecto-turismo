class Guide {

  /**
   * @param {object} params This is a set of params to store on DB
   **/
  constructor(params, res) {
    this.params = params;

    delete this.params._id;

  }

  /**
   * This method will return a set of params to store on DB
   *
   * @return {object} params
   **/
  save() {
    // validating all the fields
    this.validate();

    // choosing fields to save
    return this.getFields();
  }

  /**
   * Returns a list of params associated to this model
   **/
  getFields() {
    // Getting params from request
    const {
      identification, name, schedules, cellphone, available
    } = this.params;

    // return processed params
    return {
      identification, name, 
      schedules, cellphone, 
      available: (available || false)
    };
  }

  validate() {
    if(!this.params.name || !this.params.identification) {
      throw new Error("El nombre y cédula son requeridos");
    }
  }
}

module.exports = Guide;
