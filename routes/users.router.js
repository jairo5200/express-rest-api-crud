const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');

const {createUserSchema,updateUserSchema,getUserSchema,loginUserSchema} = require('../schemas/user.schema');

const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
//importamos el modulo de servicios de usuarios
const UserService = require('../services/user.service')

const router = express.Router();

//creamos un objeto e inciializamos para poder usar sus metodos
const service = new UserService();

router.get('/', async  (req, res, next) => {
    const users = await service.find();
    res.json(users);
});

router.get('/:id', 
    validatorHandler(getUserSchema,'params'),
    async  (req, res, next) => {
        try {
            const user = await service.findOne(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
});

router.post('/', 
    validatorHandler(createUserSchema,'body'),
    async  (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
});

router.patch('/:id', 
    validatorHandler(getUserSchema,'params'),
    validatorHandler(updateUserSchema,'body'),
    async  (req, res, next) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const user = await service.update(id,body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
});

router.delete('/:id', 
    validatorHandler(getUserSchema,'params'),
    async  (req, res, next) => {
        try {
            const user = await service.delete(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
});

router.post('/login', 
    validatorHandler(loginUserSchema,'body'),
    async  (req, res, next) => {
        try {
            const body = req.body;
            const user = await service.login(body);
            const token = jwt.sign({id: user.id,name: user.name,email: user.email}, config.secretKey,
                {
                expiresIn: '1h'
                });
            res.json(rta, token);
        } catch (error) {
            next(error);
        }
});

//exportamos el router para poder usarlo en otros archivos
module.exports = router;