'use strict'

const Model = use('Model')

class Programm extends Model {
    /* validation rules */
    static get rules() {
        return {
            bezeichnung: 'required|unique:einrichtungs|min:3|max:30'
        }
    }

    semester() {
        return this.belongsTo('App/Models/Semester')
    }

    themas() {
        return this.belongsToMany('App/Models/Thema')
    }     
}

module.exports = Programm
