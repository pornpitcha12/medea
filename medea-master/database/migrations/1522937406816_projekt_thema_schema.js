'use strict'

const Schema = use('Schema')

class ProjektThemaSchema extends Schema {
  up () {
    this.create('projekt_thema', (table) => {
      table.integer('projekt_id').unsigned().index('projekt_id')
      table.integer('thema_id').unsigned().index('thema_id')
      table.foreign('projekt_id').references('projekts.id').onDelete('cascade')
      table.foreign('thema_id').references('themas.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('projekt_themas')
  }
}

module.exports = ProjektThemaSchema
