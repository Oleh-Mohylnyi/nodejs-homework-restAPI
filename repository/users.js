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

const updateToken = async (id, token) => {
  return await Users.updateOne({ _id: id }, { token })
}

const updateAvatar = async (id, avatarURL, idAvatarCloud = null) => {
  return await Users.updateOne({ _id: id }, { avatarURL, idAvatarCloud })
}

export default {findById, findByEmail, create, updateToken, updateAvatar}