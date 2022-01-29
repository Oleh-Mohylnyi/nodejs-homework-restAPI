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
import wrapperError from '../../../midllewares/error-handler';

const router = new Router();

const listContactsController = new ListContactsController();
router.get('/', [guard, validateQuery], wrapperError(listContactsController.execute));

const getByIdController = new GetByIdController();
router.get('/:id', [guard, validateId], wrapperError(getByIdController.execute));

const addContactController = new AddContactController();
router.post('/', [guard, validateCreate], wrapperError(addContactController.execute));

const removeContactController = new RemoveContactController();
router.delete('/:id', [guard, validateId], wrapperError(removeContactController.execute));

const updateContactController = new UpdateContactController();
router.put(
    '/:id',
    [guard, validateId, validateUpdate],
    wrapperError(updateContactController.execute));

    const updateContactFavoriteController = new UpdateContactFavoriteController();
router.patch(
    '/:id/favorite',
    [guard, validateId, validateUpdateFavorite],
    wrapperError(updateContactFavoriteController.execute));

export default router;
