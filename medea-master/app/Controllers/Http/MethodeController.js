'use strict'

const Methode = use('App/Models/Methode')
const { validate } = use('Validator')
const moment = require('moment');

class MethodeController {
    async index ({ view }) {
        const methodes = await Methode.all()
        return view.render('management.methodes.index', { methodes: methodes.toJSON() })
    }

    async details({ params, view }) {
        const methode = await Methode.find(params.id)

        return view.render('management.methodes.details', {
            methode: methode
        })
    }

    async add ({ view }) {
        return view.render('management.methodes.add')
    }

    async store({ request, response, session, auth }) {
        const validation = await validate(request.all(), Methode.rules)
        console.log(validation)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const sichtbar = (request.input('sichtbar') == 1 ? 1 : 0)

        const methode = new Methode()

        methode.bezeichnung = request.input('bezeichnung')
        methode.beschreibung = request.input('beschreibung')
        methode.sichtbar = sichtbar
        methode.created_by = user.username
        methode.created_at = now
        methode.updated_by = user.username
        methode.updated_at = now     
        await methode.save()

        // Fash success message to session
        session.flash({ notification: 'Methode erstellt!' })

        return response.redirect('/management/methodes')
    }

      async edit({ params, view }) {
        const methode = await Methode.find(params.id)

        return view.render('management.methodes.edit', {
            methode: methode
        })
    }

    async update({ params, request, response, session, auth }) {
        const validation = await validate(request.all(), Methode.rules)
  
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const methode = await Methode.find(params.id)
        const sichtbar = (request.input('sichtbar') == 1 ? 1 : 0)

        methode.bezeichnung = request.input('bezeichnung')
        methode.beschreibung = request.input('beschreibung')
        methode.sichtbar = sichtbar
        methode.updated_by = user.username 
        methode.updated_at = now

        await methode.save()

        session.flash({ notification: 'methode Updated!' })

        return response.redirect('/management/methodes')
    }

    async destroy({ params, session, response }) {
        const methode = await Methode.find(params.id)

        await methode.delete()

        session.flash({ notification: 'methode Deleted!' })
  
        return response.redirect('/management/methodes')
    }
}

module.exports = MethodeController
