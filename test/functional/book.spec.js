'use strict'

const { test, trait } = use('Test/Suite')('Book')
const Book = use('App/Models/Book')

trait('Test/ApiClient')

test('get list of books', async ({ client }) => {
  await Book.create({
    title: 'Huckleberry Finn',
    isbn: '9783161484100',
    cover_url: 'https://example.com',
    is_read: true,
    is_favorite: false,
    first_publish_year: 1800,
    read_date: null
  })

  const response = await client.get('/books').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    title: 'Huckleberry Finn',
    isbn: '9783161484100',
    cover_url: 'https://example.com',
    is_read: 1,
    is_favorite: 0,
    first_publish_year: 1800,
    read_date: null
  }])
})

test('get a book', async ({ client }) => {
  await Book.find(28);

  const response = await client.get('/books/28').end()
  response.assertStatus(200)
})
