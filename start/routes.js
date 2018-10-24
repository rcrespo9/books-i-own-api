'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome');

Route.post('login', 'AuthController.login');

Route.post('register', 'AuthController.register')

Route.resource('authors', 'AuthorController')
  .apiOnly()
  .middleware(new Map([
    [
        ['store', 'update', 'destroy'],
        ['auth']
      ]
    ]));

Route.resource('books', 'BookController')
  .apiOnly()
  .middleware(new Map([
      [
        ['store', 'update', 'destroy'],
        ['auth']
      ]
    ]));

