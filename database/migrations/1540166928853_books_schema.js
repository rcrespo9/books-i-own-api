'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up () {
    this.table('books', (table) => {
      table.string('isbn', 17).alter()
    })
  }

  down () {
    this.table('books', (table) => {
      table.string('isbn', 13)
    })
  }
}

module.exports = BooksSchema
