/* eslint-disable no-unused-vars */
import getStatisticsContacts from '../../repository/contacts/getStatisticsContacts'
import repositoryUsers from '../../repository/users'
import { HttpCode } from '../../lib/constants'
import {
  UploadFileService,
  LocalFileStorage,
  // CloudFileStorage,
} from '../../service/file-storage'
import { EmailService, SenderNodemailer, SenderSendgrid } from '../../service/email'

const aggregation = async (req, res, next) => {
  const { id } = req.params
  const data = await getStatisticsContacts(id)
  if (data) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data })
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user,
  )
  const avatarUrl = await uploadService.updateAvatar()
  res
    .status(HttpCode.OK)
      .json({
          status: 'success',
          code: HttpCode.OK,
          message: "Success!",
          data: { avatarUrl }
      })
}

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true)
    return res
      .status(HttpCode.OK)
        .json({
            status: 'success',
            code: HttpCode.OK,
            data: { message: 'Success' }
      })
  }
      res
      .status(HttpCode.BAD_REQUEST)
        .json({
            status: 'success',
            code: HttpCode.BAD_REQUEST,
            data: { message: 'Invalid token' }
      })  

}
const repeatEmailForVerifyUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await repositoryUsers.findByEmail(email);
    if (user) {
      const { email, name, verifyTokenEmail } = user
      // const emailService = new EmailService(
      //   process.env.NODE_ENV,
      //   new SenderNodemailer(),
      // )

      const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderSendgrid(),
      )
    
      const isSend = await emailService.sendVerifyEmail(
        email, name, verifyTokenEmail,
      )
      if (isSend) {
        return res
          .status(HttpCode.OK)
          .json({
            status: 'success',
            code: HttpCode.OK,
            data: { message: "Success" },
          })
      }
      res
        .status(HttpCode.SE)
        .json({
          status: 'error',
          code: HttpCode.SE,
          data: { message: "Service Unavailable" },
        })
    }
  } catch {

    res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: { message: 'User with email not found' },
      })
  }
}

export { aggregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser }
