const
  app = require('../integration');

describe('Stat API', function () {
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
        start_date: '2017-03-06T12:48:26.219Z',
        end_date: '2017-03-06T12:48:26.219Z'
      }]
    };

  before(() => app.fixtureClear(fixture));
  before(() => app.fixtureLoad(fixture));
  //before(() => app.auth('test@example.com', 'password'));
  after(() => app.fixtureClear(fixture));

  it('GET /api/stats', () => app
    .request('GET', '/api/stats')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => res.body.length.should.equal(3)));

  it('GET /api/stats/:id', () => app
    .request('GET', '/api/stats/58b431d82728b84e536598e8')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => res.body.should.deepEqual({
      _id: '58b431d82728b84e536598e8',
      weight: 90,
      arm: 45,
      waist: 70,
      __v: 0,
      sprint: {
        _id: '28b431d82728b84e536598e1',
        carbohydrate: 250,
        fat: 25,
        protein: 120,
        start_date: '2017-03-06T12:48:26.219Z',
        end_date: '2017-03-06T12:48:26.219Z',
        stats: [],
        __v: 0
      },
      date: '2017-03-06T12:48:26.219Z'
    })));

  it('POST /api/stats', () => app
    .request('POST', '/api/stats')
    .send({
      _id: '58b431d82728b84e536598e9',
      weight: 80,
      arm: 45,
      waist: 70,
      date: '2017-03-06T12:48:26.219Z'
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then(res => res.body.should.deepEqual({
      _id: '58b431d82728b84e536598e9',
      weight: 80,
      arm: 45,
      waist: 70,
      __v: 0,
      date: '2017-03-06T12:48:26.219Z',
    })));

  it('PUT /api/stats/:id', () => app
    .request('PUT', '/api/stats/58b431d82728b84e536598e8')
    .send({
      _id: '58b431d82728b84e536598e8',
      weight: 100,
      arm: 45,
      waist: 70
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => res.body.should.deepEqual({
      _id: '58b431d82728b84e536598e8',
      weight: 100,
      arm: 45,
      waist: 70,
      sprint: {
        _id: '28b431d82728b84e536598e1',
        carbohydrate: 250,
        fat: 25,
        protein: 120,
        start_date: '2017-03-06T12:48:26.219Z',
        end_date: '2017-03-06T12:48:26.219Z',
        stats: [],
        __v: 0
      },
      __v: 0,
      date: '2017-03-06T12:48:26.219Z'
    })));

  it('DELETE /api/stats/:id', () => app
    .request('DELETE', '/api/stats/58b431d82728b84e536598e8')
    .expect(204));
});
