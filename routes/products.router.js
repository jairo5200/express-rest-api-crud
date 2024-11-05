const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const {createProductSchema,updateProductSchema,getProductSchema} = require('../schemas/product.schema')

//importamos el modulo de servicios de productos
const ProductsService = require('../services/product.service')

const router = express.Router();

//creamos un objeto e inciializamos para poder usar sus metodos
const service = new ProductsService();


router.get('/', async  (req, res, next) => {
    const products = await service.find();
    res.json(products);
});

router.get('/:id',
    validatorHandler(getProductSchema,'params'),
    async  (req, res, next) => {
        try {
            const product = await service.findOne(req.params.id);
            res.json(product);
        } catch (error) {
            next(error)
        }
});

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async  (req, res, next) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
});

router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async  (req, res, next) => {
        try {
            const id = req.params.id;
            const product = await service.findOne(id);
            const body = req.body;
            const rta = await product.update(body);
            res.status(201).json(rta);
        } catch (error) {
            next(error);
        }
});

router.delete('/:id',
    validatorHandler(getProductSchema,'params'),
    async  (req, res, next) => {
        try {
            const product = await service.delete(req.params.id);
            res.json(product);
        } catch (error) {
            next(error);
        }
});


//exportamos el router para poder usarlo en otros archivos
module.exports = router;