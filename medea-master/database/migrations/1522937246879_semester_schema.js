'use strict'

const Schema = use('Schema')

class SemesterSchema extends Schema {
  up () {
    this.create('semesters', (table) => {
      table.increments()
      table.string('bezeichnung', 45).notNullable()
      table.string('created_by', 255).notNullable()
      table.string('updated_by', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('semesters')
  }
}

module.exports = SemesterSchema
