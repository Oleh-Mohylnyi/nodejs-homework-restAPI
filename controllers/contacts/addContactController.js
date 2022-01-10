import { HttpCode } from '../../lib/constants';
import addContact from '../../repository/contacts/addContactRepository';

const addContactController = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await addContact(userId, req.body);
  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.OK,
    data: { contact: newContact },
  })
}

export default addContactController;