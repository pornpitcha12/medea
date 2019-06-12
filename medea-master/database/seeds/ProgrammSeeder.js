'use strict'

/*
|--------------------------------------------------------------------------
| ProgrammSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class ProgrammSeeder {
  async run () {
    const programmSeed = await Factory
      .model('App/Models/Programm')
      .create()
  }
}

module.exports = ProgrammSeeder
