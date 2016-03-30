'use strict'

var Tape = require('tape')
,   BufferConcat = require('../lib/index.js').default
,   Faker = require('faker')

Tape('Has the proper API', function (t) {
    t.plan(3)

    var Concatenator = new BufferConcat()

    t.ok(Concatenator.render instanceof Function, "has render method")
    t.ok(Concatenator.append instanceof Function, "has append method")
    t.ok(Concatenator.length !== undefined, "has length property")
})

Tape('Concatenates', function (t) {
    t.plan(1)

    var Concatenator = new BufferConcat()
    Concatenator.append('zob')
    Concatenator.append('zob')

    t.equal(Concatenator.render(), 'zobzob')
})

Tape('Concatenates with multi buffers', function (t) {
    t.plan(1)

    var Concatenator = new BufferConcat(3)
    Concatenator.append('zob')
    Concatenator.append('zob')

    t.equal(Concatenator.render(), 'zobzob')
})

Tape('Concatenates big strings', function (t) {
    t.plan(1)

    var stringStash = [
        Faker.lorem.paragraph(),
        Faker.lorem.paragraph(),
        Faker.lorem.paragraph()
    ]

    var Concatenator = new BufferConcat()

    stringStash.forEach(function (paragraph) => {
        Concatenator.append(paragraph)
    })

    t.equal(Concatenator.render(), stringStash.join(''), 'big strings')
})

Tape('Concatenates big strings with utf8 chars', function (t) {
    t.plan(1)

    function accentedParagraph() {
        return Faker.lorem.paragraph().replace(/e/g, 'é')
    }

    var stringStash = [
        accentedParagraph(),
        accentedParagraph(),
        accentedParagraph()
    ]

    var Concatenator = new BufferConcat()

    stringStash.forEach(function (paragraph) {
        Concatenator.append(paragraph)
    })

    t.equal(Concatenator.render(), stringStash.join(''), 'Should be ok with accented strings')
})
