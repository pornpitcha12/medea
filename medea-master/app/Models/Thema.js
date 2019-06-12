'use strict'

const Model = use('Model')

class Thema extends Model {
    /* validation rules */
    static get rules() {
        return {
            bezeichnung: 'required'
        }
    }    
    
    programms() {
        return this.belongsToMany('App/Models/Programm')
    }

    projekts() {
        return this.belongsToMany('App/Models/Projekt')
    }    
}

module.exports = Thema
