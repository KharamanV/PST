/**
 * Integration test helpers
 */
process.env.NODE_ENV = 'test';
require('should');

const
  app = require('../..'),
  mongoose = require('mongoose'),
  supertest = require('supertest');

exports = module.exports = {
  app,
  auth,
  fixtureClear,
  fixtureLoad,
  request,
};

/**
 * Load fixtures
 */
function fixtureLoad(fixture) {
  return Promise.all(Object.keys(fixture).map(key => {
    let
      Model = mongoose.model(key);

    return Promise.all(fixture[key].map(data => new Model(data).save()));
  }));
}

/**
 * Clear fixture collections
 */
function fixtureClear(fixture) {
  return Promise.all(Object.keys(fixture).map(model => mongoose.model(model).remove()));
}

/**
 * Set authentication for further queries
 *
 * @param email
 * @param password
 * @returns {Promise}
 */
function auth(email, password) {
  this._token = null;

  if (!email) {
    return Promise.resolve();
  }

  return this.request('post', '/auth/local')
    .send({email, password})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      this._token = res.body.token;

      return this._token;
    });
}

/**
 * Execute supertest request with authentication
 *
 * @param method
 * @param action
 * @param auth
 * @returns supertest.Request
 */
function request(method, action, auth = true) {
  method = method.toLowerCase();

  let
    req = supertest(app)[method](action);

  if (auth && this._token) {
    req = req.set('authorization', `Bearer ${this._token}`);
  }

  return req;
}
