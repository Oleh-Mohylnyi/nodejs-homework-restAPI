import { Router } from 'express';

import {
    validateCreate,
    validateUpdate,
    validateId,
    validateQuery,
    validateUpdateFavorite
} from '../../../midllewares/validation/contactValidation';

import {
    ListContactsController,
    GetByIdController,
    RemoveContactController,
    UpdateContactController,
    AddContactController,
    UpdateContactFavoriteController
} from '../../../controllers/contacts';


import guard from '../../../midllewares/guard';

const router = new Router();

const listContactsController = new ListContactsController();
router.get('/', [guard, validateQuery], listContactsController.execute);

const getByIdController = new GetByIdController();
router.get('/:id', [guard, validateId], getByIdController.execute);

const addContactController = new AddContactController();
router.post('/', [guard, validateCreate], addContactController.execute);

const removeContactController = new RemoveContactController();
router.delete('/:id', [guard, validateId], removeContactController.execute);

const updateContactController = new UpdateContactController();
router.put(
    '/:id',
    [guard, validateId, validateUpdate],
    updateContactController.execute);

    const updateContactFavoriteController = new UpdateContactFavoriteController();
router.patch(
    '/:id/favorite',
    [guard, validateId, validateUpdateFavorite],
    updateContactFavoriteController.execute);

export default router;
