'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Book = use('App/Models/Book')

/**
 * Resourceful controller for interacting with books
 */
class BookController {
  /**
   * Show a list of all books.
   * GET books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ response }) {
    const books = await Book
      .query()
      .with('author')
      .fetch();

      return response.json(books);
  }

  /**
   * Create/save a new book.
   * POST books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const bookInfo = request.only(['title', 'author_id', 'isbn', 'cover_url', 'is_read', 'is_favorite', 'first_publish_year', 'read_date']);

    const book = new Book();
    book.title = bookInfo.title;
    book.author_id = bookInfo.author_id;
    book.isbn = bookInfo.isbn;
    book.cover_url = bookInfo.cover_url;
    book.is_read = bookInfo.is_read;
    book.is_favorite = bookInfo.is_favorite;
    book.first_publish_year = bookInfo.first_publish_year;

    await book.save();

    return response.status(201).json(book);
  }

  /**
   * Display a single book.
   * GET books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const book = await Book.find(params.id);

    try {
      await book.loadMany(['author'])
    } catch (error) {
      return response.status(204).json(null);
    }

    return response.json(book);
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const bookInfo = request.only(['title', 'author_id', 'isbn', 'cover_url', 'is_read', 'is_favorite', 'first_publish_year', 'read_date']);

    const book = await Book.find(params.id);

    if (!book) {
      return response.status(404).json({ data: 'Book not found' });
    }

    book.title = bookInfo.title;
    book.author_id = bookInfo.author_id;
    book.isbn = bookInfo.isbn;
    book.cover_url = bookInfo.cover_url;
    book.is_read = bookInfo.is_read;
    book.is_favorite = bookInfo.is_favorite;
    book.first_publish_year = bookInfo.first_publish_year;

    await book.save();

    return response.status(200).json(book);
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const book = await Book.find(params.id);

    if (!book) {
      return response.status(404).json({ data: 'Book not found' });
    }

    await book.delete();

    return response.status(204).json(null);
  }
}

module.exports = BookController
