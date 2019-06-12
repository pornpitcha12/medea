'use strict'

const Schema = use('Schema')

class ProgrammSchema extends Schema {
  up () {
    this.create('programms', (table) => {
      table.increments()
      table.string('bezeichnung', 255).notNullable()
      table.text('beschreibung')
      table.integer('semester_id').unsigned()
      table.date('as_deadline')
      table.date('as_verlaengert')
      table.boolean('aktiv')
      table.date('as_bekanntgabe')
      table.date('as_hiwi_at')
      table.text('as_info_antrag')
      table.text('as_info_tn')
      table.text('as_info_hiwi')
      table.string('as_kontakt_name', 255).notNullable()
      table.string('as_kontakt_email', 255).notNullable()
      table.text('vorlage_angenommen')
      table.text('vorlage_abgelehnt')
      table.string('created_by', 255).notNullable()
      table.string('updated_by', 255).notNullable()
      table.timestamps()
      table.foreign('semester_id').references('semesters.id')
    })
  }

  down () {
    this.drop('programms')
  }
}

module.exports = ProgrammSchema
