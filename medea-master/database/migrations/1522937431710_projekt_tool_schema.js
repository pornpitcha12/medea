'use strict'

const Schema = use('Schema')

class ProjektToolSchema extends Schema {
  up () {
    this.create('projekt_tool', (table) => {
      table.integer('projekt_id').unsigned().index('projekt_id')
      table.integer('tool_id').unsigned().index('tool_id')
      table.foreign('projekt_id').references('projekts.id').onDelete('cascade')
      table.foreign('tool_id').references('tools.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('projekt_tools')
  }
}

module.exports = ProjektToolSchema
