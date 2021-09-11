const { createCategory } = require('../model/repository')

const CategoryCreate = ({ title, description }) => createCategory({ title, description })

module.exports = { CategoryCreate }
