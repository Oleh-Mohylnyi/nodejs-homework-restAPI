import updateContactFavorite from '../../repository/contacts/updateStatusContactRepository';
import { HttpCode } from '../../lib/constants';
import { CustomError } from '../../lib/custom-error';

class UpdateContactFavoriteController {

async execute(req, res, next) {
  const { id } = req.params;
  const { id: userId } = req.user;
    const updatedContact = await updateContactFavorite(userId, id, req.body);
  if (updatedContact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { updatedContact } })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}
}

export default UpdateContactFavoriteController