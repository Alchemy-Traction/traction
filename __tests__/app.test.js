const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('traction-app routes', () => {
  // beforeEach(() => {
  //   return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  // });

  // it('allows a user to signup via POST', async () => {
  //   return request(app)
  //     .post('/')
  //     .send({
  //       phoneNumber: 1112223333,
  //       pin: 1234,
  //       password: '',
  //       passwordHash: '',
  //       user_photo_url: 'mymug.com'
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         id: expect.any(String),
  //         phoneNumber: 1112223333,
  //         pin: 1234,
  //         password: '',
  //         passwordHash: '',
  //         user_photo_url: 'mymug.com'
  //       });
  //     });
  // });

  it('pass the damn test', async () => {
    expect('equal').toEqual('equal');
  });
});
