const express = require('express')
const routes = express()
const { getProducts, getProduct, getfreight } = require('../controllers/produtos')

routes.get('/produtos', getProducts)
routes.get('/produtos/:id', getProduct)
routes.get('/produtos/:id/frete/:cep', getfreight)

module.exports = routes