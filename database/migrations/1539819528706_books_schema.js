'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up () {
    this.table('books', (table) => {
      table.integer('author_id')
        .unsigned()
        .references('authors.id')
        .onDelete('SET NULL')
        .nullable()
    })
  }

  down () {
    this.table('books', (table) => {
      table.dropForeign('author_id')
      table.dropColumn('author_id')
    })
  }
}

module.exports = BooksSchema
