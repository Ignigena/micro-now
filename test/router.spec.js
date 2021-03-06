const micro = require('micro')
const path = require('path')
const request = require('supertest')

const { router, withHelpers } = require('../')

describe('router', () => {
  it('parses manual router configuration', async () => {
    const handler = micro(router({ dirname: path.resolve(__dirname, './routes') }))

    await request(handler).get('/users').expect(200)
    await request(handler).get('/legacy').expect(404)
  })

  it('handles zero configuration routing', async () => {
    const handler = micro(withHelpers(router({ dirname: path.resolve(__dirname, './zero-config') })))

    await request(handler).get('/api/users').expect(200)
    await request(handler).get('/api/users/Ignigena').expect(200).expect('Hello Ignigena!')
    await request(handler).get('/').expect(404)
  })
})
