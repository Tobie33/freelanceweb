// src/controllers/api/tweets/create.js
import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  message: yup.string().required(),
  receiverID: yup.number().required()
})

const controllersApiMyConversationsCreate = async (req, res) => {
  try {
    // req.session.user = { id: user.id }
    const { body, session: { user: { id } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    // const newObj = Object.assign(verifiedData, { senderId: id })
    const newConversation = await prisma.conversation.create({
      data: {
        ...verifiedData,
        senderID: id
      }
    })
    return res.status(201).json(newConversation)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyConversationsCreate
