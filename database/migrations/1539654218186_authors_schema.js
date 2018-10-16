'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuthorsSchema extends Schema {
  up () {
    this.create('authors', (table) => {
      table.increments()
      table.timestamps()
      table.string('first_name')
      table.string('last_name').nullable()
    })
  }

  down () {
    this.drop('authors')
  }
}

module.exports = AuthorsSchema
