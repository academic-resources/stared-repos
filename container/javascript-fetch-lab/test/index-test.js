const expect = require('expect')
const fs = require('fs')
const jsdom = require('jsdom')
const path = require('path')

describe('index', () => {
  before(done => {
    const html = path.resolve(__dirname, '..', 'index.html')
    const src = path.resolve(__dirname, '..', 'index.js')

    jsdom.env(html, [src], (err, window) => {
      if (err) {
        return done(err)
      }

      Object.keys(window).forEach(key => {
        global[key] = window[key]
      })

      done()
    })
  })

  it('does not commit token', () => {
    expect(getToken()).toEqual('')
  })

  describe('index.html', () => {
    it('creates a div with an id of "issues"', () => {
      expect(document.getElementById('issues')).toExist()
    })
  })

  describe('fetch functions', () => {
    let fetchSpy
    before(() => {
      window.fetch = require('node-fetch')
    })

    beforeEach(() => {
      fetchSpy = expect.spyOn(window, "fetch").andReturn(new Promise(() => {}))
    })

    afterEach(() => {
      fetchSpy.restore()
    })

    it('fetches the create fork api', () => {
      forkRepo()
      const url = fetchSpy.calls[0].arguments[0]
      expect(url).toMatch(/api.github.com\/repos\/learn-co-curriculum\/javascript-fetch-lab/)
      const opts = fetchSpy.calls[0].arguments[1]
      expect(opts.method).toMatch(/post/)
      expect(opts.headers).toMatch(/Authorization: token\s./)
    })

    it('fetches the create issue api', () => {
      document.getElementById('title').value = "test"
      document.getElementById('body').value = "test body"

      createIssue()
      const url = fetchSpy.calls[0].arguments[0]
      expect(url).toMatch(/javascript-fetch-lab\/issues/)
      expect(url).toNotMatch(/learn-co-curriculum/)
      const opts = fetchSpy.calls[0].arguments[1]
      expect(opts.method).toMatch(/post/)
      expect(opts.headers).toMatch(/Authorization: token\s./)
      expect(opts.body).toMatch(/test body/)
    })

    it('fetches the get issues api', () => {
      getIssues()
      const url = fetchSpy.calls[0].arguments[0]
      expect(url).toMatch(/javascript-fetch-lab\/issues/)
      expect(url).toNotMatch(/learn-co-curriculum/)
    })
  })
})
