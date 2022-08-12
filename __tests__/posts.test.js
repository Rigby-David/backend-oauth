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
    expect(res.body[0]).toEqual({
      content: expect.any(String),
      created_at: expect.any(String),
    });
  });

  it('#POST /posts auth users can post to the table', async () => {
    const newPost = {
      content: 'Hiya friend',
    };

    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    const res = await agent.post('/api/v1/posts').send(newPost);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      id: expect.any(String),
      ...newPost,
      created_at: expect.any(String)
    });
  });
});
