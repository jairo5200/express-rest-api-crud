const express = require('express');

//importamos el modulo de servicios de usuarios
const UserService = require('../services/user.service')

const router = express.Router();

//creamos un objeto e inciializamos para poder usar sus metodos
const service = new UserService();

router.get('/', async  (req, res, next) => {
    const users = await service.find();
    res.json(users);
});

router.get('/:id', async  (req, res, next) => {
    const user = await service.findOne(req.params.id);
    res.json(user);
});

router.post('/', async  (req, res, next) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
});

router.patch('/:id', async  (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const user = await service.update(id,body);
    res.status(201).json(user);
});

router.delete('/:id', async  (req, res, next) => {
    const user = await service.delete(req.params.id);
    res.json(user);
});

//exportamos el router para poder usarlo en otros archivos
module.exports = router;