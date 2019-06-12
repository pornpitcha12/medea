'use strict'

const Einrichtung = use('App/Models/Einrichtung')
const { validate } = use('Validator')
const moment = require('moment');

class EinrichtungController {
    async index ({ view }) {
        const einrichtungs = await Einrichtung.all()
        return view.render('management.einrichtungs.index', { einrichtungs: einrichtungs.toJSON() })
    }

    async details({ params, view }) {
        const einrichtung = await Einrichtung.find(params.id)

        return view.render('management.einrichtungs.details', {
            einrichtung: einrichtung
        })
    }

    async add ({ view }) {
        return view.render('management.einrichtungs.add')
    }

    async store({ request, response, session, auth }) {
        const validation = await validate(request.all(), Einrichtung.rules)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')

        const einrichtung = new Einrichtung()

        einrichtung.bezeichnung = request.input('bezeichnung')
        einrichtung.created_by = user.username
        einrichtung.created_at = now
        einrichtung.updated_by = user.username
        einrichtung.updated_at = now     
        await einrichtung.save()

        // Fash success message to session
        session.flash({ notification: 'Einrichtung erstellt!' })

        return response.redirect('/management/einrichtungs')
    }

      async edit({ params, view }) {
        const einrichtung = await Einrichtung.find(params.id)

        return view.render('management.einrichtungs.edit', {
            einrichtung: einrichtung
        })
    }

    async update({ params, request, response, session, auth }) {
        const validation = await validate(request.all(), Einrichtung.rules)
  
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const einrichtung = await Einrichtung.find(params.id)

        einrichtung.bezeichnung = request.input('bezeichnung')
        einrichtung.updated_by = user.username 
        einrichtung.updated_at = now

        await einrichtung.save()

        session.flash({ notification: 'Einrichtung Updated!' })

        return response.redirect('/management/einrichtungs')
    }

    async destroy({ params, session, response }) {
        const einrichtung = await Einrichtung.find(params.id)

        await einrichtung.delete()

        session.flash({ notification: 'Einrichtung Deleted!' })
  
        return response.redirect('/management/einrichtungs')
    }
}

module.exports = EinrichtungController
