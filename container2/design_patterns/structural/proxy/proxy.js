/**
 * This example is not the one from GoF, because I consider this to be more simple and descriptive.
 */

function LanguageCoder() {

this.getLanguageParadigm = function(lang) {
    if (lang === "Javascript") return "Prototypal-based OOP"
    if (lang === "Haskell") return "Functional"
    if (lang === "C") return "Procedural"
    return "Unavailable"
}
}

function LanguageProxy() {
    const langCoder = new LanguageCoder();
    const langCache = {};

    return {
        getLanguageParadigm: function(lang) {
            if (!langCoder[lang]) {
                langCache[lang] = langCoder.getLanguageParadigm(lang)
            }
            return langCache[lang]
        },
        getCacheSize: function() { return Object.entries(langCache).length }
    }
}

function demoClient() {
    const langCoder = new LanguageProxy()

    // decode requests
    console.log(langCoder.getLanguageParadigm('Javascript'))
    console.log(langCoder.getLanguageParadigm('Haskell'))
    console.log(langCoder.getLanguageParadigm('C'))
    console.log(langCoder.getLanguageParadigm('Javascript'))
    console.log('Languages in cache: ', langCoder.getCacheSize())
}

demoClient()
