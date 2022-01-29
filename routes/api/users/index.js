import { Router } from "express";
import {aggregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser } from '../../../controllers/users';
import guard from '../../../midllewares/guard';
import { upload } from '../../../midllewares/upload';
import roleAccess from '../../../midllewares/role-access';
import { Role } from '../../../lib/constants';
import wrapperError from '../../../midllewares/error-handler';

const router = new Router();

router.get('/stats/:id', guard, roleAccess(Role.ADMIN), wrapperError(aggregation));

router.patch('/avatars',
    guard,
    upload.single('avatar'),
    wrapperError(uploadAvatar));

router.get('/verify/:token', wrapperError(verifyUser));

router.post('/verify', wrapperError(repeatEmailForVerifyUser));

export default router