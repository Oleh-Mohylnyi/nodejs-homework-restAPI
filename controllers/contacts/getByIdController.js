import { HttpCode } from '../../lib/constants';
import getContactById from '../../repository/contacts/getContactByIdRepository';
import { CustomError } from '../../lib/custom-error';

class GetByIdController {

async execute(req, res, next) {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await getContactById(userId, id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
  }
}

export default GetByIdController;