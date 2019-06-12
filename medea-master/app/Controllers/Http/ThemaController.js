'use strict'

const Thema = use('App/Models/Thema')
const { validate } = use('Validator')
const moment = require('moment')

class ThemaController {
    async index ({ view }) {
        const themas = await Thema.all()
        return view.render('management.themas.index', { themas: themas.toJSON() })
    }

    async details({ params, view }) {
        const thema = await Thema.find(params.id)

        return view.render('management.themas.details', {
            thema: thema
        })
    }

    async add ({ view }) {
        return view.render('management.themas.add')
    }

    async store({ request, response, session, auth }) {
        const validation = await validate(request.all(), Thema.rules)
        console.log(validation)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const sichtbar = (request.input('sichtbar') == 1 ? 1 : 0)

        const thema = new Thema()

        thema.bezeichnung = request.input('bezeichnung')
        thema.beschreibung = request.input('beschreibung')
        thema.sichtbar = sichtbar
        thema.created_by = user.username
        thema.created_at = now
        thema.updated_by = user.username
        thema.updated_at = now
        await thema.save()

        // Fash success message to session
        session.flash({ notification: 'Thema erstellt!' })

        return response.redirect('/management/themas')
    }

      async edit({ params, view }) {
        const thema = await Thema.find(params.id)

        return view.render('management.themas.edit', {
            thema: thema
        })
    }

    async update({ params, request, response, session, auth }) {
        const validation = await validate(request.all(), Thema.rules)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const thema = await Thema.find(params.id)
        const sichtbar = (request.input('sichtbar') == 1 ? 1 : 0)

        thema.bezeichnung = request.input('bezeichnung')
        thema.beschreibung = request.input('beschreibung')
        thema.sichtbar = sichtbar
        thema.updated_by = user.username
        thema.updated_at = now

        await thema.save()

        session.flash({ notification: 'Thema Updated!' })

        return response.redirect('/management/themas')
    }

    async destroy({ params, session, response }) {
        const thema = await Thema.find(params.id)

        await thema.delete()

        session.flash({ notification: 'Thema Deleted!' })

        return response.redirect('/management/themas')
    }
}

module.exports = ThemaController
