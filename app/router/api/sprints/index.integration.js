const
  app = require('../integration');

describe('Sprint API', function () {
  let
    fixture = {
      Stat: [{
        _id: '58b431d82728b84e536598e8',
        weight: 90,
        arm: 45,
        waist: 70,
        date: '2017-03-06T12:48:26.219Z',
        sprint: '28b431d82728b84e536598e1'
      }, {
        weight: 80,
        arm: 44,
        waist: 72,
      }, {
        weight: 88,
        arm: 41,
        waist: 60,
      }],
      Sprint: [{
        _id: '28b431d82728b84e536598e1',
        carbohydrate: 250,
        fat: 25,
        protein: 120,
        stats: ['58b431d82728b84e536598e8'],
        start_date: '2017-03-06T12:48:26.219Z',
        end_date: '2017-03-06T12:48:26.219Z'
      }]
    };

  before(() => app.fixtureClear(fixture));
  before(() => app.fixtureLoad(fixture));
  //before(() => app.auth('test@example.com', 'password'));
  after(() => app.fixtureClear(fixture));

  it('GET /api/sprints', () => app
    .request('GET', '/api/sprints')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => res.body.length.should.equal(1)));

  it('GET /api/sprints/:id', () => app
    .request('GET', '/api/sprints/28b431d82728b84e536598e1')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => res.body.should.deepEqual({
      _id: '28b431d82728b84e536598e1',
      carbohydrate: 250,
      fat: 25,
      protein: 120,
      stats: [{
        _id: '58b431d82728b84e536598e8',
        weight: 90,
        arm: 45,
        waist: 70,
        date: '2017-03-06T12:48:26.219Z',
        sprint: '28b431d82728b84e536598e1',
        __v: 0
      }],
      start_date: '2017-03-06T12:48:26.219Z',
      end_date: '2017-03-06T12:48:26.219Z',
      __v: 0
    })));

  it('POST /api/sprints', () => app
    .request('POST', '/api/sprints')
    .send({
      _id: '58b431d82728b84e536298e9',
      carbohydrate: 250,
      fat: 25,
      protein: 120,
      start_date: '2017-03-06T12:48:26.219Z',
      end_date: '2017-03-06T12:48:26.219Z'
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then(res => res.body.should.deepEqual({
      _id: '58b431d82728b84e536298e9',
      carbohydrate: 250,
      fat: 25,
      protein: 120,
      start_date: '2017-03-06T12:48:26.219Z',
      stats: [],
      end_date: '2017-03-06T12:48:26.219Z',
      __v: 0
    })));

  it('PUT /api/sprints/:id', () => app
    .request('PUT', '/api/sprints/28b431d82728b84e536598e1')
    .send({
      _id: '28b431d82728b84e536598e1',
      carbohydrate: 25,
      fat: 2,
      protein: 12
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => res.body.should.deepEqual({
      _id: '28b431d82728b84e536598e1',
      carbohydrate: 25,
      fat: 2,
      protein: 12,
      stats: [{
        _id: '58b431d82728b84e536598e8',
        weight: 90,
        arm: 45,
        waist: 70,
        date: '2017-03-06T12:48:26.219Z',
        sprint: '28b431d82728b84e536598e1',
        __v: 0
      }],
      start_date: '2017-03-06T12:48:26.219Z',
      end_date: '2017-03-06T12:48:26.219Z',
      __v: 0
    })));

  it('DELETE /api/sprints/:id', () => app
    .request('DELETE', '/api/stats/28b431d82728b84e536598e1')
    .expect(204));
});
