const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const description = Joi.string();
const price = Joi.number();
const amount = Joi.number().integer();


const createProductSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    amount: amount.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    description: description,
    price: price,
    amount: amount,
});

const getProductSchema = Joi.object({
    id: id.required(),
});


module.exports = {createProductSchema,updateProductSchema,getProductSchema};