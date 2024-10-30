
const express = require('express');

//importamos el modulo de servicios de productos
const ProductsService = require('../services/product.service')

const router = express.Router();

//creamos un objeto e inciializamos para poder usar sus metodos
const service = new ProductsService();


router.get('/', async  (req, res, next) => {
    const products = await service.find();
    res.json(products);
});

router.get('/:id', async  (req, res, next) => {
    const product = await service.findOne(req.params.id);
    res.json(product);
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


//exportamos el router para poder usarlo en otros archivos
module.exports = router;