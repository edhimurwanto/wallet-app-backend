const hapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

exports.register = (server, options, next) => {
    server.register([
        Inert,
        Vision,
        {
            register: hapiSwagger,
            select: ['api'],
            cache: {
                expiresIn: 24 * 60 * 60 * 1000
            },
            options: {
                info: {
                    title: 'API Documentations for with hapi-swagger',
                    version: '1.0.0'
                },
                documentationPath: 'docs-api',
                basePath: '/',
                host: 'localhost'
            }
        }], (err) => {
            if (err) {
                server.log(['error'], `hapi-swagger load error: ${err}`)
            }else{
                server.log(['start'], 'hapi-swagger interface loaded')
            }
        });
        next();
};

exports.register.attributes = {
    name: 'swagger-plugin'
};
