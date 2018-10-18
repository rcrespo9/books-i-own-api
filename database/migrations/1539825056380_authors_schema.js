'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuthorsSchema extends Schema {
  up () {
    this.table('authors', (table) => {
      table.string('middle_name').nullable();
    })
  }

  down () {
    this.table('authors', (table) => {
      table.dropColumn('middle_name');
    })
  }
}

module.exports = AuthorsSchema
