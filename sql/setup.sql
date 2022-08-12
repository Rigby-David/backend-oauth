-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS gh_users;
DROP TABLE IF EXISTS posts;

CREATE TABLE gh_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT,
    avatar TEXT
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content VARCHAR(255), 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (content) VALUES
  ('i will hand down righteous judgment and smite all who disregard brumbpo tungus'),
  ('watch as i wriggle in the swamp and love nge'),
  ('transtrender voice: im gonna think deeply about worms'),
  ('its time to ask the real questions: is it ok 2 avoid black sludge'),
  ('back in my scene days i tried to work on my new book about kylie jenner?');