import { HttpCode } from '../../lib/constants';
import removeContact from '../../repository/contacts/removeContactRepository';
import { CustomError } from '../../lib/custom-error';

class RemoveContactController {
  async execute(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await removeContact(userId, id)
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { contact } })
    }
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
  }
}

export default RemoveContactController;