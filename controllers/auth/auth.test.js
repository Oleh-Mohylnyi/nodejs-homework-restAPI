import { jest } from '@jest/globals';
import { login } from './index';
import authService from '../../service/auth';
import { registration } from './index'
import { HttpCode } from '../../lib/constants'



describe('Unit test login', () => {
    let req, res, next
    beforeEach(() => {
        req = {body:{email: 'test@test.tes', password: '12345'}};
        res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
        next = jest.fn();
        authService.getUser = jest.fn(async (data) => data);
        authService.getToken = jest.fn(async (data) => true);
    })
    test('response should have status code 200', async () => {
        authService.getUser = jest.fn(async (data) => data);
        await login(req, res, next);
        expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
    })
})



// describe('Unit test registration', () => {
//     // beforeAll(fn)
//     // beforeEach(fn)
//     // afterAll(fn)
//     // afterEach(fn)
//     let req, res, next
//     beforeEach(() => {
//         req = { body: { email: 'test@test.com', password: '12345678' } }
//         res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) }
//         next = jest.fn()
//         authService.create = jest.fn(async (data) => data)
//     })
//     test('SignUp new User', async () => {
//         authService.isUserExist = jest.fn(async () => false)
//         await registration(req, res, next)
//         expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email)
//         expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED)
//     })
// })
