import CustomerService from '../services/customer.service';
const customerService = new CustomerService();
const Joi = require('@hapi/joi');

module.exports = [
    {
        method: 'GET',
        path: '/customers',
        handler: async (request, h) => {

            const customers = await customerService.findAll();
            return h.response({
                statusCode: 200,
                customers
            }).code(200);
        }
    },
    {
        method: 'GET',
        path: '/customers/{id}',
        handler: async (request, h) => {

            const customer = await customerService.findOne(request.id);
            return h.response({
                statusCode: 200,
                customer
            }).code(200);
        }
    },
    {
        method: 'POST',
        path: '/customers',
        config: {
            handler: async (request, h) => {
                const customer = await customerService.create(request.payload);
                return h.response({
                    statusCode: 201,
                    customer
                }).code(201);
            },
            validate: {
                payload: {
                    fullname: Joi.string().max(100).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).max(200).required(),
                    birthdate: Joi.date().required(),
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/customers',
        config: {
            handler: async (request, h) => {
                const customer = await customerService.update(request.payload);
                return h.response({
                    statusCode: 200,
                    customer
                }).code(200);
            },
            validate: {
                payload: {
                    id: Joi.required(),
                    fullname: Joi.string().max(100).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).max(200).required(),
                    birthdate: Joi.date().required(),
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/customers/{id}',
        config: {
            handler: async (request, h) => {

                const { id } = request.params;

                await customerService.delete(id);
            },
            response: {
                emptyStatusCode: 204
            },
        }
    },
];