'use strict'

const Schema = use('Schema')

class ProjektSchema extends Schema {
  up () {
    this.create('projekts', (table) => {
      table.increments()
      table.string('token', 16)
      table.string('bezeichnung', 255).notNullable()
      table.text('beschreibung')
      table.integer('programm_id').unsigned()
      table.text('an_ziele')
      table.text('an_tools_info')
      table.integer('an_hiwi_stunden').unsigned()
      table.integer('an_hiwi_monate').unsigned()
      table.text('an_hiwi_beschreibung')
      table.string('kp_anrede', 45)
      table.string('kp_titel', 45)
      table.string('kp_vorname', 255)
      table.string('kp_nachname', 255)
      table.string('kp_email', 255)
      table.integer('einrichtung_id').unsigned()
      table.boolean('rv_angenommen')
      table.text('rv_vermerk')
      table.boolean('rv_benachrichtigt')
      table.dateTime('rv_benachrichtigt_at')
      table.text('rv_benachrichtigt_mail')
      table.integer('hiwi_stunden').unsigned()
      table.integer('hiwi_monate').unsigned()
      table.text('hiwi_beschreibung')
      table.boolean('bt_auftakt_ein')
      table.boolean('bt_auftakt_tn')
      table.boolean('bt_abschluss_ein')
      table.boolean('bt_abschluss_tn')
      table.text('pub_bericht')
      table.boolean('pub_good_practice')
      table.boolean('pub_aktiv')
      table.integer('pub_anzahl_clicks').unsigned()
      table.timestamps()
      table.foreign('einrichtung_id').references('einrichtungs.id')
    })
  }

  down () {
    this.drop('projekts')
  }
}

module.exports = ProjektSchema
