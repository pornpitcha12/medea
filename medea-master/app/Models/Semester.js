'use strict'

const Model = use('Model')

class Semester extends Model {
    /* validation rules */
    static get rules() {
        return {
            bezeichnung: 'required|unique:semesters|min:3|max:30'
        }
    }

    programms() {
        return this.hasMany('App/Models/Programm')
    }    
}

module.exports = Semester
