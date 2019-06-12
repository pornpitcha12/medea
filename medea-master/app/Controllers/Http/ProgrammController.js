'use strict'

const Programm = use('App/Models/Programm')
const Semester = use('App/Models/Semester')
const { validate } = use('Validator')
const moment = require('moment');

class ProgrammController {
    async index ({ view }) {
        const programms = await Programm.all()
        return view.render('management.programms.index', { programms: programms.toJSON() })
    }

    async details({ params, view }) {
        const programm = await Programm.find(params.id)

        return view.render('management.programms.details', {
            programm: programm
        })
    }

    async add ({ view }) {
        const semesters = await Semester.all()
        return view.render('management.programms.add', { semesters: semesters.toJSON() })
    }

    async store({ request, response, session, auth }) {
        const validation = await validate(request.all(), Programm.rules)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const as_aktiv = (request.input('as_aktiv') == 1 ? 1 : 0)

        const programm = new Programm()

        programm.bezeichnung = request.input('bezeichnung')
        programm.beschreibung = request.input('beschreibung')
        programm.semester_id = request.input('semester_id')
        programm.as_deadline = request.input('as_deadline')
        programm.as_verlaengert = request.input('as_verlaengert')
        programm.as_aktiv = as_aktiv
        programm.as_bekanntgabe = request.input('as_bekanntgabe')
        programm.as_hiwi_at = request.input('as_hiwi_at')
        programm.as_info_antrag = request.input('as_info_antrag')
        programm.as_info_tn = request.input('as_info_tn')
        programm.as_kontakt_name = request.input('as_kontakt_name')
        programm.as_kontakt_email = request.input('as_kontakt_email')
        programm.vorlage_angenommen = request.input('vorlage_angenommen')
        programm.vorlage_abgelehnt = request.input('vorlage_abgelehnt')

        programm.created_by = user.username
        programm.created_at = now
        programm.updated_by = user.username
        programm.updated_at = now
        await programm.save()

        // Fash success message to session
        session.flash({ notification: 'Programm erstellt!' })

        return response.redirect('/management/programms')
    }

      async edit({ params, view }) {
        const programm = await Programm.find(params.id)
        const semesters = await Semester.all()

        return view.render('management.programms.edit', {
            programm: programm, semesters: semesters.toJSON()
        })
    }

    async update({ params, request, response, session, auth }) {
        const validation = await validate(request.all(), Programm.rules)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await auth.getUser()
        const now = moment().format('YYYY-MM-DD hh::mm:ss')
        const programm = await Programm.find(params.id)
        const as_aktiv = (request.input('as_aktiv') == 1 ? 1 : 0)

        programm.bezeichnung = request.input('bezeichnung')
        programm.beschreibung = request.input('beschreibung')
        programm.semester_id = request.input('semester_id')
        programm.as_deadline = request.input('as_deadline')
        programm.as_verlaengert = request.input('as_verlaengert')
        programm.as_aktiv = as_aktiv
        programm.as_bekantgabe = request.input('as_bekantgabe')
        programm.as_hiwi_at = request.input('as_hiwi_at')
        programm.as_info_antrag = request.input('as_info_antrag')
        programm.as_info_tn = request.input('as_info_tn')
        programm.as_kontakt_name = request.input('as_kontakt_name')
        programm.as_kontakt_email = request.input('as_kontakt_email')
        programm.vorlage_angenommen = request.input('vorlage_angenommen')
        programm.vorlage_abgelehnt = request.input('vorlage_abgelehnt')

        programm.updated_by = user.username
        programm.updated_at = now

        await programm.save()

        session.flash({ notification: 'Programm Updated!' })

        return response.redirect('/management/programms')
    }

    async destroy({ params, session, response }) {
        const programm = await Programm.find(params.id)


        await programm.delete()

        session.flash({ notification: 'Programm Deleted!' })

        return response.redirect('/management/programms')
    }
}

module.exports = ProgrammController
