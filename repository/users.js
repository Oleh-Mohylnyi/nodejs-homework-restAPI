import Users from "../models/users";

const findById = async (id) => {
    return await Users.findById(id)
}

const findByEmail = async (email) => {
    return await Users.findOne({email})
}

const create = async (body) => {
  const user = new Users(body)
  return await user.save()
}

const updateAvatar = async (id, avatarURL, idAvatarCloud = null) => {
  return await Users.updateOne({ _id: id }, { avatarURL, idAvatarCloud })
}

const updateToken = async (id, token) => {
  return await Users.updateOne({ _id: id }, { token })
}

const findByVerifyToken = async (verifyTokenEmail) => {
    return await Users.findOne({verifyTokenEmail})
}

const updateVerify = async (id, status) => {
  return await Users.updateOne({ _id: id }, { isVerify: status, verifyTokenEmail: null })
}


export default {
  findById,
  findByEmail,
  create,
  updateToken,
  updateVerify,
  updateAvatar,
  findByVerifyToken
}