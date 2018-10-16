'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Author = use('App/Models/Author')

/**
 * Resourceful controller for interacting with authors
 */
class AuthorController {
  /**
   * Show a list of all authors.
   * GET authors
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index ({ response }) {
    const authors = await Author
      .query()
      .with('books')
      .fetch();

      return response.json(authors);
  }

  /**
   * Create/save a new author.
   * POST authors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const authorInfo = request.only(['first_name', 'last_name']);
    
    const author = new Author();
    author.first_name = authorInfo.first_name;
    author.last_name = authorInfo.last_name;

    await author.save();

    return response.status(201).json(author);
  }

  /**
   * Display a single author.
   * GET authors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const author = await Author.find(params.id);

    try {
      await author.load('books');
    } catch (error) {
      return response.status(204).json(null);
    }

    return response.json(author);
  }

  /**
   * Update author details.
   * PUT or PATCH authors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const authorInfo = request.only(['first_name', 'last_name']);

    const author = await Author.find(params.id);

    if (!author) {
      return response.status(404).json({ data: 'Author not found' });
    }

    author.first_name = authorInfo.first_name;
    author.last_name = authorInfo.last_name;

    await author.save();

    return response.status(200).json(author);
  }

  /**
   * Delete a author with id.
   * DELETE authors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const author = await Author.find(params.id);

    if (!author) {
      return response.status(404).json({ data: 'Author not found' });
    }

    await author.delete();

    return response.status(204).json(null);
  }
}

module.exports = AuthorController
