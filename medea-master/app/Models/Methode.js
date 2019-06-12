'use strict'

const Model = use('Model')

class Methode extends Model {
    /* validation rules */
    static get rules() {
        return {
            bezeichnung: 'required'
        }
    }    
        
    projekts() {
        return this.belongsToMany('App/Models/Projekt')
    }    
}

module.exports = Methode
