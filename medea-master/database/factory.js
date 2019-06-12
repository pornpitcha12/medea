'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker) => {
    return {
      username: faker.username(),
      email: faker.email(),
      password: faker.password()
    }
  })

// @programSeeder.js
Factory.blueprint('App/Models/Programm', async (faker) => {
    return {
      bezeichnung: faker.sentence(),
      as_kontakt_name: faker.name(),
      as_kontakt_email: faker.email(),
      created_by: faker.name(),
      updated_by: faker.name(),
      as_deadline: faker.date(),
      as_bekanntgabe: faker.date(),
      as_hiwi_at: faker.date(),
    }
  })

  // @themaSeeder.js
  Factory.blueprint('App/Models/Thema', async (faker) => {
    return {
      bezeichnung: faker.sentence(),
      beschreibung: faker.sentence(),
      einrichtung_id: faker.integer({ min: 1, max: 3 }),
      programm_id: faker.integer({ min: 1, max: 3 }),
      kp_vorname: faker.name(),
      kp_nachname: faker.last(),
      kp_email: faker.email(),
      created_by: faker.name(),
      updated_by: faker.name()
    }
  })
