import { HttpCode } from '../../lib/constants';
import updateContact from '../../repository/contacts/updateContactRepository';

class UpdateContactController {

async execute(req, res, next) {
  const { id } = req.params;
  const { id: userId } = req.user;
  const updatedContact = await updateContact(userId, id, req.body)
  if (updatedContact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { updatedContact } })
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}
}

export default UpdateContactController
