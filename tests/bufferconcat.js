'use strict'

const Tape = require('tape')
,   BufferConcat = require('../lib/index.js').default
,   Faker = require('faker')

Tape('Has the proper API', t => {
    t.plan(3)

    let Concatenator = new BufferConcat()

    t.ok(Concatenator.render instanceof Function, "has render method")
    t.ok(Concatenator.append instanceof Function, "has append method")
    t.ok(Concatenator.length !== undefined, "has length property")
})

Tape('Concatenates', t => {
    t.plan(1)

    let Concatenator = new BufferConcat()
    Concatenator.append('zob')
    Concatenator.append('zob')

    t.equal(Concatenator.render(), 'zobzob')
})

Tape('Concatenates with multi buffers', t => {
    t.plan(1)

    let Concatenator = new BufferConcat(3)
    Concatenator.append('zob')
    Concatenator.append('zob')

    t.equal(Concatenator.render(), 'zobzob')
})

Tape('Concatenates big strings', t => {
    t.plan(1)

    let stringStash = [
        Faker.lorem.paragraph(),
        Faker.lorem.paragraph(),
        Faker.lorem.paragraph()
    ]

    let Concatenator = new BufferConcat()

    stringStash.forEach(paragraph => {
        Concatenator.append(paragraph)
    })

    t.equal(Concatenator.render(), stringStash.join(''), 'big strings')
})

Tape('Concatenates big strings with utf8 chars', t => {
    t.plan(1)
    
    function accentedParagraph() {
        return Faker.lorem.paragraph().replace(/e/g, 'é')
    }

    let stringStash = [
        accentedParagraph(),
        accentedParagraph(),
        accentedParagraph()
    ]

    let Concatenator = new BufferConcat()

    stringStash.forEach(paragraph => {
        Concatenator.append(paragraph)
    })

    t.equal(Concatenator.render(), stringStash.join(''), 'Should be ok with accented strings')
})
