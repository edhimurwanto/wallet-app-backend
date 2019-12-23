import LoginService from '../auth/login.service';

const loginService = new LoginService();
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

module.exports = [
    {
        method: 'POST',
        path: '/auth/login',
        config: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).max(200).required(),
                }
            },
            handler: async (request, h) => {
                try {

                    const data = await loginService.login(request.payload);
                    return h.response(data).code(200);
                } catch (error) {
                    throw Boom.unauthorized('Invalid login credentials.');
                }
            },
        }
    },
    {
        method: 'GET',
        path: '/auth/logout',
        handler: async (request, h) => {

            return 'Log out service created soon.';
        }
    },
];

// export default Router()
//     .post('/login', async (req, res, next) => {
//         try {
//             const data = req.body;
//             const user = await loginService.login(data);
//             // req.session.user = user;
//             client.set('sessionId', user.id);
//             res.cookie.user = user;
//             res.status(200).json(user);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     })

//     .get('/logout', async (req, res) => {

//         if (req.session.user && req.cookies.foo) {
//             res.clearCookie('foo').json({
//                 message: 'Logout succes'
//             });
//         } else {
//             res.status(401).json({ message: 'You are not login.' });
//         }
//     })