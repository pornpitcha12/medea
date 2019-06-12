'use strict'

const randtoken = use('rand-token')
const Faker = use('faker')
const Database = use('Database')
const { validate } = use('Validator')
const Mail = use('Mail')
const Einrichtung = use('App/Models/Einrichtung')
const Semester = use('App/Models/Semester')
// const Event = use('Event')

const Thema = use('App/Models/Thema')
const Tag = use('App/Models/Tag')
const Tool = use('App/Models/Tool')
const Methode = use('App/Models/Methode')
const Programm = use('App/Models/Programm')
const Projekt = use('App/Models/Projekt')

class ProjektController {
    async index ({ view }) {
        const projekts = await Projekt.all()
        return view.render('management.projekts.index', { projekts: projekts.toJSON() })
    }

    async apply({ request, view }) {
        const programms = await Programm.all()
        const themas = await Thema.all()
        const tags = await Tag.all()
        const tools = await Tool.all()
        const methodes = await Methode.all()
        const einrichtungs = await Einrichtung.all()
        const projekts = await Projekt.all()

        const formSections = [
          {name: 'Main', id: '0'},
          {name: 'Aux1', id: '1'},
          {name: 'Aux2', id: '2'},
          {name: 'Aux3', id: '3'},
          {name: 'Personal', id: '4'},
        ]
        const idParam = request.input('id')

        return view.render('online.projekte.apply', {
            programms : programms.toJSON(),
            themas: themas.toJSON(),
            tags: tags.toJSON(),
            tools: tools.toJSON(),
            methodes: methodes.toJSON(),
            einrichtungs: einrichtungs.toJSON(),
            projekts: projekts.toJSON(),
            formSections: formSections,
            idParam: idParam
        })
    }

    async confirm({ request, response, session, view }) {
        const validation = await validate(request.all(), Projekt.rules)
        console.log(validation)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const from_edit = request.input('from_edit')

        const projekt = new Projekt()
        if (from_edit == 1) {
            projekt.token = request.input('token')
        }

        projekt.einrichtung_id = request.input('einrichtung_id')
        projekt.programm_id = request.input('programm_id')
        projekt.bezeichnung = request.input('bezeichnung')
        projekt.beschreibung = request.input('beschreibung')
        projekt.kp_vorname = request.input('kp_vorname')
        projekt.kp_nachname = request.input('kp_nachname')
        projekt.kp_email = request.input('kp_email')

        const einrichtung = await Einrichtung.find(request.input('einrichtung_id'))
        const programm = await Programm.find(request.input('programm_id'))
        const thema = await Thema.find(request.input('thema_id'))

        return view.render('online.projekte.confirm', {
            projekt: projekt.toJSON(),
            einrichtung: einrichtung.toJSON(),
            programm: programm.toJSON(),
            thema: thema.toJSON(),
            from_edit: from_edit
        })
    }

    async submitViewTest({ request, view }) {
      // test method for Neuer Antrag
      // should be removed

      const projekt = new Projekt()

      const token = randtoken.generate(16)

      projekt.token = token
      projekt.bezeichnung = Faker.lorem.sentence()
      projekt.beschreibung = Faker.lorem.sentences(2)
      projekt.an_ziele = Faker.lorem.sentences(3)
      projekt.an_tools_info = Faker.lorem.sentences(2)
      projekt.einrichtung_id = Faker.random.number(3)
      projekt.programm_id = Faker.random.number(3)
      projekt.kp_vorname = Faker.name.firstName()
      projekt.kp_nachname = Faker.name.lastName()
      projekt.kp_email = Faker.internet.email()

      console.log(projekt)

      return view.render('online.projekte.submit', {
        projekt: projekt.toJSON()
      })
    }

    async store({ request, response, session, view }) {
        const validation = await validate(request.all(), Projekt.rules)
        console.log('STORE')
        console.log(validation)

        if(validation.fails()){
          session.withErrors(validation.messages()).flashAll()
          return response.redirect.back
        }

        const token = randtoken.generate(16)

        const projekt = new Projekt()

        projekt.token = token
        projekt.bezeichnung = request.input('bezeichnung')
        projekt.beschreibung = request.input('beschreibung')
        projekt.einrichtung_id = request.input('einrichtung_id')
        projekt.programm_id = request.input('programm_id')
        projekt.kp_vorname = request.input('kp_vorname')
        projekt.kp_nachname = request.input('kp_nachname')
        projekt.kp_email = request.input('kp_email')

        await projekt.save()

        const thema_ids = request.input('thema_id')

        if (thema_ids && thema_ids.length > 0) {
            await projekt.themas().attach(thema_ids)
            projekt.thema_ids = await projekt.themas().fetch()
        }

        // Fash success message to session
        session.flash({ notification: 'Application sent!' })

        // send email
        const einrichtung = await projekt.einrichtung().fetch()
        await Mail.send('/emails.application_received', { projekt: projekt.toJSON(), einrichtung: einrichtung.toJSON() }, (message) => {
            message.subject('Application Sent')
            message.from('abatiel@uni-bremen.de')
            message.to(request.input('kp_email'))
            message.text(projekt.bezeichnung + '\n\n' + projekt.beschreibung + '\n\n' + einrichtung.bezeichnung)
        })

        return view.render('online.projekte.submit', {
            token: token,
            projekt: projekt.toJSON()
        })
    }

    async prepare_edit({ params, request, response }) {
      console.log('editing starting. params are', params)
      console.log('request is', request)
        const token = params.token
        console.log('token is', token)
        // let projekt = await Projekt.find(token)
        // console.log(projekt)

        const id = await Database
          .select('id')
          .from('projekts')
          .where('token', token)
        // let projekt = projekts.filter(p => p.token == token)
        console.log('editing done')

        // return edit(id)
    }

    async edit({ params, view }) {
      let token
      let id
      if(params.token) {
        token = params.token
        console.log(`token is ${params.token}`)
        id = await Database
          .select('id')
          .from('projekts')
          .where('token', token)
      } else if(params.id) {
        id = params.id
        console.log(`id is ${params.id}`)
      }
        let projekt = await Projekt.find(id)

        console.log('projekt is', projekt)

        return view.render('online.projekte.edit', {
            projekt: projekt
        })
    }

    async update({ request, response, session, view }) {
        const validation = await validate(request.all(), Projekt.rules)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const projekt = await Projekt.findBy('token', request.input('token'))

        projekt.bezeichnung = request.input('bezeichnung')
        projekt.beschreibung = request.input('beschreibung')
        projekt.einrichtung_id = request.input('einrichtung_id')
        projekt.programm_id = request.input('programm_id')
        projekt.kp_vorname = request.input('kp_vorname')
        projekt.kp_nachname = request.input('kp_nachname')
        projekt.kp_email = request.input('kp_email')
        await projekt.save()

        const thema_ids = request.input('thema_id')

        if (thema_ids && thema_ids.length > 0) {
            await projekt.themas().detach()
            await projekt.themas().attach(thema_ids)
            projekt.thema_ids = await projekt.themas().fetch()
        }

        // Fash success message to session
        session.flash({ notification: 'Application updated!' })

        // send email
        const einrichtung = await projekt.einrichtung().fetch()
        await Mail.send('/emails.application_updated', { projekt: projekt.toJSON(), einrichtung: einrichtung.toJSON() }, (message) => {
            message.subject('Application Updated')
            message.from('abatiel@uni-bremen.de')
            message.to(request.input('kp_email'))
            message.text(projekt.bezeichnung + '\n\n' + projekt.beschreibung + '\n\n' + einrichtung.bezeichnung)
        })

        return view.render('online.projekte.submitted', {
            token: projekt.token
        })
    }
    async destroy({ params, session, response }) {
      const projekt = await Projekt.find(params.id)

      await projekt.delete()

      session.flash({ notification: 'Projekt Deleted!' })

      return response.redirect('/management/projekts')

    }
}

module.exports = ProjektController
