const Joi = require('joi');

const id = Joi.number().integer();
const status = Joi.string().max(50);
const userId = Joi.number().integer();

const createOrderSchema = Joi.object({
    status: status.required(),
    userId: userId.required(),
});

const updateOrderSchema = Joi.object({
    status: status,
    userId: userId,
});

const getOrderSchema = Joi.object({
    id: id.required(),
});

module.exports = {createOrderSchema,updateOrderSchema,getOrderSchema};