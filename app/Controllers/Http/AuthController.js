'use strict'

const User = use('App/Models/User')

class AuthController {
  async login ({ request, auth }) {
    const { username, password } = request.all();
    let token = await auth
      .attempt(username, password)

    return token
  }

  async register ({ request, response }) {
    const { username, email, password } = request.all();

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();

    return response.status(201).json(user);
  }
}

module.exports = AuthController
