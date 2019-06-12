'use strict'

const Schema = use('Schema')

class ProjektTagSchema extends Schema {
  up () {
    this.create('projekt_tag', (table) => {
      table.integer('projekt_id').unsigned().index('projekt_id')
      table.integer('tag_id').unsigned().index('tag_id')
      table.foreign('projekt_id').references('projekts.id').onDelete('cascade')
      table.foreign('tag_id').references('tags.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('projekt_tags')
  }
}

module.exports = ProjektTagSchema
