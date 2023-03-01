// src/controllers/api/tweets/create.js
import yup from 'yup'

import _ from 'lodash'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().email().required(),
  lookingForWork: yup.boolean().required(),
  cv: yup.object().when('lookingForWork', {
    is: true,
    then: yup.object().shape({
      age: yup.number().required(),
      experience: yup.number().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      categories: yup.string().required(),
      roles: yup.string().required()
    }),
    otherwise: yup.object().notRequired()
  })
})

const controllersApiMyConversationsCreate = async (req, res) => {
  try {
    const { body, session: { user: { id } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    // const newObj = Object.assign(verifiedData, { senderId: id })
    const newConversation = await prisma.user.update({
      where: { id },
      data: {
        ..._.omit(verifiedData, ['cv', 'passwordHash']),
        ...verifiedData?.cv || {},
        categories: {
          set: [],
          connect: verifiedData?.cv?.categories ? {
            categoryName: verifiedData.cv.categories
          } : undefined
        },
        roles: {
          set: [],
          connect: verifiedData?.cv?.roles ? {
            roleName: verifiedData.cv.roles
          } : undefined
        }
      },
      include: {
        categories: true,
        roles: true
      }
    })
    return res.status(201).json(newConversation)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyConversationsCreate
