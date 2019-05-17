const assert = require('assert')
const { stem } = require('./stemmer.js')

it('basic -ing', () => {
  assert.equal(stem("testing"), "test")
})

it('basic -ed', () => {
  assert.equal(stem("tested"), "test")
})

it('basic -s', () => {
  assert.equal(stem("tests"), "test")
})

it('basic -es', () => {
  assert.equal(stem("passes"), "pass")
})

it('basic -eed', () => {
  assert.equal(stem("agreed"), "agree")
})

it('-ies with stem ending in -y', () => {
  assert.equal(stem("ponies"), "pony")
})

it('-ing with 1 syllable', () => {
  assert.equal(stem("sing"), "sing")
})

it('-ing with stem ending in e', () => {
  assert.equal(stem("filing"), "file")
})

it('-ed with stem ending in e', () => {
  assert.equal(stem("conflated"), "conflate")
})

it('-ed with stem ending in e', () => {
  assert.equal(stem("troubled"), "trouble")
})

it('-ed with stem ending in e', () => {
  assert.equal(stem("sized"), "size")
})

it('-ing with double consonants', () => {
  assert.equal(stem("hopping"), "hop")
})

it('-ing with double consonants', () => {
  assert.equal(stem("controlling"), "control")
})

it('-ed with double consonants', () => {
  assert.equal(stem("tanned"), "tan")
})

it('-ing with stem ending in double consonants', () => {
  assert.equal(stem("falling"), "fall")
})

it('-ing with stem ending in double consonants', () => {
  assert.equal(stem("hissing"), "hiss")
})

it('-ed with stem ending in double consonants', () => {
  assert.equal(stem("fizzed"), "fizz")
})

it('Irregular -es: leaves', () => {
  assert.equal(stem("leaves"), "leave")
})

it('Irregular -es: ties', () => {
  assert.equal(stem("ties"), "ti")
})




