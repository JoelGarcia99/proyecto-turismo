class Category {

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
    console.log(this.params)
    const {
      title, description, target, active
    } = (this.params);

    return {
      title, description, target, active: Boolean(active)
    };
  }

  validate() {
    if(!this.params.title || !this.params.target) {
      throw new Error("El título y target son requeridos");
    }
  }
}

module.exports = Category;
