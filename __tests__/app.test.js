const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');


describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'david_github_user',
      email: 'totes-real@real.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  it('#DELETE signs out a user', async () => {
    const res = await request
      .agent(app)
      .delete('/api/v1/github');

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out',
    });
  });

});
