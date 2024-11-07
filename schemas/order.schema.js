const Joi = require('joi');

const id = Joi.number().integer();
const status = Joi.string().max(50);
const userId = Joi.number().integer();
const orderId = Joi.number();
const productId = Joi.number();
const amount = Joi.number();


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

const addProductSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required()
  })

module.exports = {createOrderSchema,updateOrderSchema,getOrderSchema,addProductSchema};