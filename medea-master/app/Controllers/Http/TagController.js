'use strict'

const Tag = use('App/Models/Tag')
const { validate } = use('Validator')
const moment = require('moment');

class TagController {
    async index ({ view }) {
        const tags = await Tag.all()
        return view.render('management.tags.index', { tags: tags.toJSON() })
    }

    async details({ params, view }) {
        const tag = await Tag.find(params.id)

        return view.render('management.tags.details', {
            tag: tag
        })
    }

    async add ({ view }) {
        return view.render('management.tags.add')
    }

    async store({ request, response, session, auth }) {
        const validation = await validate(request.all(), Tag.rules)
        console.log(validation)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const sichtbar = (request.input('sichtbar') == 1 ? 1 : 0)

        const tag = new Tag()

        tag.bezeichnung = request.input('bezeichnung')
        tag.beschreibung = request.input('beschreibung')
        tag.sichtbar = sichtbar
        tag.created_by = user.username
        tag.created_at = now
        tag.updated_by = user.username
        tag.updated_at = now     
        await tag.save()

        // Fash success message to session
        session.flash({ notification: 'Tag erstellt!' })

        return response.redirect('/management/tags')
    }

      async edit({ params, view }) {
        const tag = await Tag.find(params.id)

        return view.render('management.tags.edit', {
            tag: tag
        })
    }

    async update({ params, request, response, session, auth }) {
        const validation = await validate(request.all(), Tag.rules)
  
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const tag = await Tag.find(params.id)
        const sichtbar = (request.input('sichtbar') == 1 ? 1 : 0)

        tag.bezeichnung = request.input('bezeichnung')
        tag.beschreibung = request.input('beschreibung')
        tag.sichtbar = sichtbar
        tag.updated_by = user.username 
        tag.updated_at = now

        await tag.save()

        session.flash({ notification: 'Tag Updated!' })

        return response.redirect('/management/tags')
    }

    async destroy({ params, session, response }) {
        const tag = await Tag.find(params.id)

        await tag.delete()

        session.flash({ notification: 'Tag Deleted!' })
  
        return response.redirect('/management/tags')
    }
}

module.exports = TagController
