'use strict'

/*
|--------------------------------------------------------------------------
| ThemaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class ThemaSeeder {
  async run () {
    const themaSeed = await Factory
      .model('App/Models/Thema')
      .create()
  }
}

module.exports = ThemaSeeder
