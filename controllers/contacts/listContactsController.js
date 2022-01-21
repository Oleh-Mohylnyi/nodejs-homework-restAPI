import { HttpCode } from '../../lib/constants';
import listContacts from '../../repository/contacts/listContactsRepository';

class ListContactsController {

async execute(req, res, next) {
  const { id: userId } = req.user;
  const contacts = await listContacts(userId, req.query);
  console.log(req.query);
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { ...contacts } })
}
}

export default ListContactsController;