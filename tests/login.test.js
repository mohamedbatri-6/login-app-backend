require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

jest.setTimeout(15000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.deleteMany({});

  const hashedPassword = await bcrypt.hash('123', 10);

  await User.create({
    email: 'test@tes.com',
    password: hashedPassword,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Test du login', () => {
  test('Connexion réussie avec bon email et mot de passe', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@tes.com',
      password: '123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Erreur si email n existe pas', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'inconnu@email.com',
      password: '123',
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Utilisateur inconnu');
  });

  test('Erreur si mauvais mot de passe', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@tes.com',
      password: 'mauvais',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Mot de passe incorrect');
  });

  test('Erreur si email ou mot de passe vide', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: '',
      password: '',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Champs manquants');
  });
});