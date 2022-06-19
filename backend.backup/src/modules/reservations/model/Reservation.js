const BaseModel = require("../../../base/models/globalModel");

/**
 * This model will controll all the logic in reservations including
 * comments
 */
class Reservation extends BaseModel{


  /**
   * @param {object} params This is a set of params to store on DB
   **/
  constructor(params) {
    super();
  
    this._collection_name = 'reservations';

    // all possible states to take
    this.allowed_states = {
      pending: 'state_pending',
      draft: 'state_draft',
      in_review: 'state_review',
      passed: 'state_passed',
      refused: 'state_refused'
    };

    // extracting class attributes from [param]
    ({
      user: this.user,
      guide: this.guide,
      touristic_point: this.touristic_point,
      schedule: this.schedule,
	  state: this.state, title: this.title
    } = params);


    // These fields cannot be modified at client side, that is why
    // they are overrided here
    this.created_at = Date.now();
    this.updated_at = Date.now();


  }

  async save(user_id) {
	console.log("Attempting to save a reservation");
	console.log(this.encapsulateParams());
    
    // state must be neither draft or pending when creating the 
    // reservation
    if(
      this.state !== this.allowed_states.draft && 
      this.state !== this.allowed_states.pending
    ) {
      throw new Error(
	"El estado solo puede ser 'draft' o 'pending'"
      );
    }

    await super.save(user_id);
	console.log("Attempting to save finished");
  }

  async validate() {
    if(
      !this.user || !this.touristic_point ||
      !this.guide || !this.schedule
    ) {
      throw new Error("Los siguientes campos son obligatorios: user, guide, touristic point, schedule");
    }
    //TODO: complete this
  }


  encapsulateParams(encapsulates_id = true) {
    const params = {
      user: this.user, guide: this.guide,
      touristic_point: this.touristic_point,
      state: this.state, description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
		_id: this._id, title: this.title

    };

    if(!encapsulates_id) {
      delete params._id;
    }

    return params;
  }

  update() {

    if(Object.values(this.states).indexOf(element => element === state) < 0) {
      // raw params
      let {
	user, touristic_point, schedule, guide, description,
	capacity, comments, state, created_at, updated_at, title
      } = this.params;

		//TODO: complete this
    }
  }
}

module.exports = Reservation;
