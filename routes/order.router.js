const express = require('express');

//importamos el modulo de servicios de usuarios
const OrderService = require('../services/order.service')

const router = express.Router();

//creamos un objeto e inciializamos para poder usar sus metodos
const service = new OrderService();

router.get('/', async  (req, res, next) => {
    const orders = await service.find();
    res.json(orders);
});

router.get('/:id', async  (req, res, next) => {
    const order = await service.findOne(req.params.id);
    res.json(order);
});

router.post('/', async  (req, res, next) => {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
});

router.patch('/:id', async  (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const order = await service.update(id,body);
    res.status(201).json(order);
});

router.delete('/:id', async  (req, res, next) => {
    const order = await service.delete(req.params.id);
    res.json(order);
});

//exportamos el router para poder usarlo en otros archivos
module.exports = router;