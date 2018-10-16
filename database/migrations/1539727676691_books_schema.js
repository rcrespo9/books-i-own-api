'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up () {
    this.table('books', (table) => {
      table.renameColumn('pub_year', 'first_publish_year');
    })
  }

  down () {
    this.table('books', (table) => {
      table.renameColumn('first_publish_year', 'pub_year');
    })
  }
}

module.exports = BooksSchema
