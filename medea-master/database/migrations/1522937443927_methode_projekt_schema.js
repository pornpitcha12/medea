'use strict'

const Schema = use('Schema')

class MethodeProjektSchema extends Schema {
  up () {
    this.create('methode_projekt', (table) => {
      table.integer('projekt_id').unsigned().index('projekt_id')
      table.integer('methode_id').unsigned().index('methode_id')
      table.foreign('projekt_id').references('projekts.id').onDelete('cascade')
      table.foreign('methode_id').references('methodes.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('methode_projekts')
  }
}

module.exports = MethodeProjektSchema
