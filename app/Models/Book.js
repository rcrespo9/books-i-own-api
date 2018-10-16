'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Book extends Model {
  author () {
    return this.belongsTo('App/Models/Author')
  }
}

module.exports = Book
