'use strict'

const Schema = use('Schema')

class TagSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments()
      table.string('bezeichnung', 255).notNullable()
      table.text('beschreibung')
      table.integer('hierarchie_id').unsigned()
      table.boolean('sichtbar')
      table.string('created_by', 255).notNullable()
      table.string('updated_by', 255).notNullable()      
      table.timestamps()
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = TagSchema
