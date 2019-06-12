'use strict'

const Model = use('Model')

class Projekt extends Model {
    /* validation rules */
    static get rules() {
        return {
          bezeichnung: 'required|unique:projekts|min:3|max:30',
          beschreibung: 'required|min:3',
          kp_vorname: 'required|string',
          kp_nachname: 'required|string',
          kp_email: 'required|email',
          programm_id: 'required|number',
          einrichtung_id: 'required|number'
        }
    }

    einrichtung() {
        return this.belongsTo('App/Models/Einrichtung')
    }

    tags() {
        return this.belongsToMany('App/Models/Tag')
    }

    tools() {
        return this.belongsToMany('App/Models/Tools')
    }

    methodes() {
        return this.belongsToMany('App/Models/Methode')
    }

    themas() {
        return this.belongsToMany('App/Models/Thema')
    }
}

module.exports = Projekt
