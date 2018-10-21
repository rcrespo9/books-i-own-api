'use strict'

const {
  test,
  trait
} = use('Test/Suite')('Author')
const Author = use('App/Models/Author')

trait('Test/ApiClient')

test('get list of authors', async ({
  client
}) => {
  await Author.create({
    first_name: 'Mark',
    last_name: 'Twain'
  })

  const response = await client.get('/authors').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    first_name: 'Mark',
    last_name: 'Twain'
  }])
})

test('get an author', async ({
  client
}) => {
  await Author.find(20);

  const response = await client.get('/authors/20').end()
  response.assertStatus(200)
})
