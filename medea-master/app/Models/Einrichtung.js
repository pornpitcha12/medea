'use strict'

const Model = use('Model')

class Einrichtung extends Model {
    /* validation rules */
    static get rules() {
        return {
            bezeichnung: 'required|unique:einrichtungs|min:3|max:30'
        }
    }

    /* one to many relation with projekts */
    projekts() {
        return this.hasMany('App/Models/Projekt')
    }    
}

module.exports = Einrichtung
