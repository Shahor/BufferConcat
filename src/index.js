'use strict'

const IS_DEV_ENV = process.env.NODE_ENV === 'dev'

function debug(message, level = 'log') {
    if (IS_DEV_ENV) {
        console[level].call(console, `[${level.toUpperCase()}]: ${message}`)
    }
}

// This modifier is used to tell how much space to prepare each time we allocate a new Buffer
// Buffer will have a length equal to Needed_Space * MODIFIER
const MODIFIER = 5

export default class BufferConcat {
    constructor (bufferSize = 256, encoding = 'utf8') {
        this._size = 0
        this._buffer = new Buffer(bufferSize)
    }

    append (str) {
        const strByteLength = Buffer.byteLength(str)

        let newSize = strByteLength + this._size

        if (newSize > this.length) {
            this.prepareNewBuffer(strByteLength)
        }

		this._buffer.write(str, this._size)
		this._size += strByteLength
    }

    prepareNewBuffer (byteLength) {
        this.trimCurrentBuffer()
        this._buffer = Buffer.concat([this._buffer, new Buffer(byteLength * MODIFIER)])
    }

    trimCurrentBuffer () {
        this._buffer = this._buffer.slice(0, this._size)
    }

    render (encoding = 'utf8', start = 0, end = null) {
        end = end || this._size

        return this._buffer.toString(encoding, 0, end)
    }

    get length () {
        return this._buffer.length
    }
}
