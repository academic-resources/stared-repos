const express = require('express')
const { setRoutes } = require('./frameworks/api/routes')

const app = setRoutes(express())

module.exports = { app }
