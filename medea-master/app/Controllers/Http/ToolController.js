
'use strict'

const Tool = use('App/Models/Tool')
const { validate } = use('Validator')
const moment = require('moment');

class ToolController {
    async index ({ view }) {
        const tools = await Tool.all()
        return view.render('management.tools.index', { tools: tools.toJSON() })
    }

    async details({ params, view }) {
        const tool = await Tool.find(params.id)

        return view.render('management.tools.details', {
            tool: tool
        })
    }

    async add ({ view }) {
        return view.render('management.tools.add')
    }

    async store({ request, response, session, auth }) {
        const validation = await validate(request.all(), Tool.rules)
        console.log(validation)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const sichtbar = (request.input('sichtbar') == 1 ? 1 : 0)

        const tool = new Tool()

        tool.bezeichnung = request.input('bezeichnung')
        tool.beschreibung = request.input('beschreibung')
        tool.sichtbar = sichtbar
        tool.created_by = user.username
        tool.created_at = now
        tool.updated_by = user.username
        tool.updated_at = now     
        await tool.save()

        // Fash success message to session
        session.flash({ notification: 'Tool erstellt!' })

        return response.redirect('/management/tools')
    }

      async edit({ params, view }) {
        const tool = await Tool.find(params.id)

        return view.render('management.tools.edit', {
            tool: tool
        })
    }

    async update({ params, request, response, session, auth }) {
        const validation = await validate(request.all(), Tool.rules)
  
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const tool = await Tool.find(params.id)
        const sichtbar = (request.input('sichtbar') == 1 ? 1 : 0)

        tool.bezeichnung = request.input('bezeichnung')
        tool.beschreibung = request.input('beschreibung')
        tool.sichtbar = sichtbar
        tool.updated_by = user.username 
        tool.updated_at = now

        await tool.save()

        session.flash({ notification: 'Tool Updated!' })

        return response.redirect('/management/tools')
    }

    async destroy({ params, session, response }) {
        const tool = await Tool.find(params.id)

        await tool.delete()

        session.flash({ notification: 'Tool Deleted!' })
  
        return response.redirect('/management/tools')
    }
}

module.exports = ToolController
