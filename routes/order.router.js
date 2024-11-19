const express = require('express');

const validatorHandler = require('../middlewares/validator.handler')

const {createOrderSchema,updateOrderSchema,getOrderSchema,addProductSchema,removeProductSchema} = require('../schemas/order.schema')

//importamos el modulo de servicios de usuarios
const OrderService = require('../services/order.service')

const router = express.Router();

//creamos un objeto e inciializamos para poder usar sus metodos
const service = new OrderService();

router.get('/', async  (req, res, next) => {
    const {user} = req.session;
        if (!user) {
            res.status(403).send('Access not authorized');
        }
    const orders = await service.find();
    res.json(orders);
});

router.get('/:id', 
    validatorHandler(getOrderSchema,'params'),
    async  (req, res, next) => {
        const {user} = req.session;
        if (!user) {
            res.status(403).send('Access not authorized');
        }
        try {
            const order = await service.findOne(req.params.id);
            res.json(order);
        } catch (error) {
            next(error);
        }
});

router.post('/', 
    validatorHandler(createOrderSchema,'body'),
    async  (req, res, next) => {
        const {user} = req.session;
        if (!user) {
            res.status(403).send('Access not authorized');
        }
        try {
            const body = req.body;
            const newOrder = await service.create(body);
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
});

router.patch('/:id', 
    validatorHandler(getOrderSchema,'params'),
    validatorHandler(updateOrderSchema,'body'),
    async  (req, res, next) => {
        const {user} = req.session;
        if (!user) {
            res.status(403).send('Access not authorized');
        }
        try {
            const id = req.params.id;
            const body = req.body;
            const order = await service.update(id,body);
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
});

router.delete('/:id', 
    validatorHandler(getOrderSchema,'params'),
    async  (req, res, next) => {
        const {user} = req.session;
        if (!user) {
            res.status(403).send('Access not authorized');
        }
        try {
            const order = await service.delete(req.params.id);
            res.json(order);
        } catch (error) {
            next(error);
        }
});

router.post('/:id/addproduct', 
    validatorHandler(getOrderSchema,'params'),
    validatorHandler(addProductSchema,'body'),
    async  (req, res, next) => {
        const {user} = req.session;
        if (!user) {
            res.status(403).send('Access not authorized');
        }
        try {
            const id = req.params.id;
            const body = req.body;
            const newProduct = await service.addProduct(id,body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
});

router.delete('/:id/removeproduct/:itemId',
    validatorHandler(removeProductSchema,'params'),
    async  (req, res, next) => {
        const {user} = req.session;
        if (!user) {
            res.status(403).send('Access not authorized');
        }
        try {
            const id = req.params.id;
            const itemId = req.params.itemId;
            const deleteProduct = await service.removeProduct(id,itemId);
            res.status(201).json(deleteProduct);
        } catch (error) {
            next(error);
        }
});

//exportamos el router para poder usarlo en otros archivos
module.exports = router;