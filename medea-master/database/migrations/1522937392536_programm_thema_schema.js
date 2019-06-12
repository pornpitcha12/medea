'use strict'

const Schema = use('Schema')

class ProgrammThemaSchema extends Schema {
  up () {
    this.create('programm_thema', (table) => {
      table.integer('programm_id').unsigned().index('programm_id')
      table.integer('thema_id').unsigned().index('thema_id')
      table.foreign('programm_id').references('programms.id').onDelete('cascade')
      table.foreign('thema_id').references('themas.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('programm_themas')
  }
}

module.exports = ProgrammThemaSchema
