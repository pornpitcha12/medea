'use strict'

const Schema = use('Schema')

class ThemaSchema extends Schema {
  up () {
    this.create('themas', (table) => {
      table.increments()
      table.string('bezeichnung', 255).notNullable()
      table.text('beschreibung')
      table.integer('hierarchie_id').unsigned().default(0)
      table.boolean('sichtbar')
      table.string('created_by', 255).notNullable()
      table.string('updated_by', 255).notNullable()            
      table.timestamps()
    })
  }

  down () {
    this.drop('themas')
  }
}

module.exports = ThemaSchema
