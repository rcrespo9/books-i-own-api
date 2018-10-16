'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments('id').primary()
      table.integer('author_id')
        .unsigned()
        .references('authors.id')
        .nullable()
      table.timestamps()
      table.string('title', 80).notNullable()
      table.integer('pub_year')
      table.text('cover_url', 1024)
      table.string('isbn', 13)
      table.boolean('is_favorite').defaultTo(false)
      table.boolean('is_read').defaultTo(false)
      table.date('read_date')
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BooksSchema
