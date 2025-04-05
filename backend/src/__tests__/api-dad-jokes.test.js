import { describe, it, expect, afterAll, beforeAll, beforeEach } from 'vitest';
import MongoMemoryServer from 'mongodb-memory-server-core';
import mongoose from 'mongoose';
import express from 'express';
import DadJoke from '../data/schema';
import dadJokesRouter from '../routes/api-dad-jokes.js';
import request from 'supertest';

const testJokes = [
  {
    _id: new mongoose.Types.ObjectId("64d2f6e2f1a2b3c4d5e6f7a1"),
    joke: 'Why did the chicken cross the road? To get to the other side!'
  },
  {
    _id: new mongoose.Types.ObjectId("64d2f6e2f1a2b3c4d5e6f7a2"),
    joke: 'Why don\'t scientists trust atoms? Because they make up everything!'
  },
  {
    _id: new mongoose.Types.ObjectId("64d2f6e2f1a2b3c4d5e6f7a3"),
    joke: 'What do you call fake spaghetti? An impasta!'
  },
  {
    _id: new mongoose.Types.ObjectId("64d2f6e2f1a2b3c4d5e6f7a4"),
    joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!'
  }
];

const mongod = new MongoMemoryServer();
await mongod.start();
const uri = mongod.getUri();
await mongoose.connect(uri);

const app = express();
app.use(express.json());
app.use('/api/dad-jokes', dadJokesRouter);

beforeEach(async () => {
  await DadJoke.deleteMany({});
  await DadJoke.insertMany(testJokes);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

describe('GET /api/dad-jokes', () => {
  it('should return all jokes', async () => {
    const response = await request(app)
      .get('/api/dad-jokes')
      .send()
      .expect(200);
    const allJokes = response.body;
    expect(allJokes.length).toBe(4);
    expect(allJokes[0]._id).toBe(testJokes[0]._id.toString());
  });
});

describe('GET /api/dad-jokes/random', () => {
  it('should return a random joke', async () => {
    const response = await request(app)
      .get('/api/dad-jokes/random')
      .send()
      .expect(200);
    const joke = response.body;
    expect(joke).toHaveProperty('_id');
    expect(joke).toHaveProperty('joke');
    console.log(joke);
  });
}
);

describe('POST /api/dad-jokes', () => {
  it('should add a new joke', async () => {
    const newJoke = { joke: 'Why did the bicycle fall over? Because it was two-tired!' };
    const response = await request(app)
      .post('/api/dad-jokes')
      .send(newJoke)
      .expect(201);
    const addedJoke = response.body;
    expect(addedJoke).toHaveProperty('_id');
    expect(addedJoke.joke).toBe(newJoke.joke);
  });
});