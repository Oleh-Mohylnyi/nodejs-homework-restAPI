import { Router } from 'express';
import { registration, login, logout } from '../../../controllers/auth';
import guard from '../../../midllewares/guard';
import wrapperError from '../../../midllewares/error-handler';

const router = new Router();

router.post('/registration', wrapperError(registration));
router.post('/login', wrapperError(login));
router.post('/logout', guard, wrapperError(logout));

export default router