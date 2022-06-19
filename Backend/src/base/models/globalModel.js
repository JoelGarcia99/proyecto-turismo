const { MongoClient } = require('mongodb');
const permissions = require('../auth/permissions');
/**
 *
 * This class will be the 'father' of all derived classes
 * such as TouristicPoint, Guide, Reservation, etc.
 * This will contain database connectors for MongoDB and
 * MySQL as well
 *
 */
class BaseModel {

  // Connection URL
  static url = process.env.MONGO_URL_CONN;
  static client = new MongoClient(BaseModel.url);


  constructor() {
    this._collection_name = null;
    this._connection = null; // connection to DB
    this._collection = null; // collection connection
  }


  async getMongoConnection() {
    const conn = await BaseModel.client.connect();
    const db = conn.db(process.env.MONGO_DB_NAME);

    return db;
  }

  async _stablishDBConnection() {
    if(this._connection && this._collection) return;

    this._connection = await this.getMongoConnection();
    this._collection = this._connection.collection(this._collection_name);
  }

  /**
   * Checks if the session user is allowed to perform a determined
   * operation.
   *
   * @param user_id {string} ID of the current user (SQL id)
   * @param role {string} role to check permission
   *
   */
  async checkAuthorization(user_id, role) {
    await this._stablishDBConnection();

    // searching for current user roles
    const collection = this._connection.collection('users');

    // current user comes from SQL database
    // TODO: Validate SQL session someway
    const user = await collection.findOne({'sql_id': user_id});

    // Roles are classified by the collection names
    const collection_roles = user.roles[this._collection_name];

    if(collection_roles.indexOf(role) < 0) {
      throw new Error("Usuario no autorizado para realizar esta accion");
    }
  }

  /**
   * Loads a model directly from DB and returns it. This
   * queried value is not saved anywhere.
   *
   * @param _id {string} ID of the object to search for
   * @param datatype {class} The class of the model to query
   * @returns {Promise | null} the model from DB
   */
  static async loadFromDB(_id, datatype) {

    // stablishing connection
    await this._stablishDBConnection();

    const collection = this._connection.collection(this._collection_name);

    // model from DB
    const model = await collection.findOne({_id: ObjectId(_id)});

    // Returning a new instance to use somewhere
    return model? new datatype(model):null;
  }

  /**
  * @param condition {object} The 'where' in the query
  * @param options {object} params to include in the query
  */
  async loadAllFromDB(condition = {}, options = {}) {
    await this._stablishDBConnection();

    return this._collection.find(condition, options).toArray();
  }

  /**
   * Saves the model to DB  
   * 
   * @param user_id {string} current session user ID
   * @returns {Promise} raw DB output
   **/
  async save(user_id) {

    // connecting to MongoDB
    await this._stablishDBConnection();
    
    // validating permissions
    await this.checkAuthorization(user_id, permissions.create);

    // first validate the fields
    await this.validate();

    const db_output = await this._collection.insertOne(this.encapsulateParams(false));

    return db_output;
  }


  /**
   * Returns all the class params as an object
   *
   * @param encapsulates_id {boolean} include ID in encapsulation
   * @returns {object}
   */
  encapsulateParams(_ = true){};

  /**
  * Validates all the model fields
  *
  * @returns {Promise<void>}
  */
  async validate(){};

}

module.exports = BaseModel;
