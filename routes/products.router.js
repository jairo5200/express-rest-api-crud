const express = require('express');

const ProductsService = require('../services/product.service')


const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
    const products = service.find();
    res.json(products);
});

router.get('/:id', (req, res) => {
    res.send('obteniendo producto...')
});

router.post('/', (req, res) => {
    res.send('publicando producto...')
});

router.patch('/', (req, res) => {
    res.send('editando producto...')
});

router.delete('/', (req, res) => {
    res.send('eliminando producto...')
});


module.exports = router;