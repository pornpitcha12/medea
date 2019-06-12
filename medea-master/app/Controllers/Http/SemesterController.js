'use strict'

const Semester = use('App/Models/Semester')
const { validate } = use('Validator')
const moment = require('moment');

class SemesterController {
    async index ({ view }) {
        const semesters = await Semester.all()
        return view.render('management.semesters.index', { semesters: semesters.toJSON() })
    }

    async details({ params, view }) {
        const semester = await Semester.find(params.id)

        return view.render('management.semesters.details', {
            semester: semester
        })
    }

    async add ({ view }) {
        return view.render('management.semesters.add')
    }

    async store({ request, response, session, auth }) {
        const validation = await validate(request.all(), Semester.rules)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')

        const semester = new Semester()

        semester.bezeichnung = request.input('bezeichnung')
        semester.created_by = user.username
        semester.created_at = now
        semester.updated_by = user.username
        semester.updated_at = now     
        await semester.save()

        // Fash success message to session
        session.flash({ notification: 'Semester erstellt!' })

        return response.redirect('/management/semesters')
    }

      async edit({ params, view }) {
        const semester = await Semester.find(params.id)

        return view.render('management.semesters.edit', {
            semester: semester
        })
    }

    async update({ params, request, response, session, auth }) {
        const validation = await validate(request.all(), Semester.rules)
  
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const semester = await Semester.find(params.id)

        semester.bezeichnung = request.input('bezeichnung')
        semester.updated_by = user.username 
        semester.updated_at = now

        await semester.save()

        session.flash({ notification: 'Semester Updated!' })

        return response.redirect('/management/semesters')
    }

    async destroy({ params, session, response }) {
        const semester = await Semester.find(params.id)

        await semester.delete()

        session.flash({ notification: 'Semester Deleted!' })
  
        return response.redirect('/management/semesters')
    }
}

module.exports = SemesterController
