const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
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

  it('#GET /posts, auth users can see list of posts at /api/v1/posts', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    const res = await agent.get('/api/v1/posts');

    expect(res.status).toBe(200);
    expect(res.body[0].toEqual({
      const: expect.any(String),
      created_at: expect.any(String),
    }));
  });

});
