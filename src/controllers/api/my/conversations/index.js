import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllerApiFindAllConversations = async (req, res) => {
  try {
    const { session: { user: { id } } } = req
    const allConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { senderID: {
            equals: id
          }
          },
          { receiverID: {
            equals: id
          }
          }
        ]
      }
    })
    return res.status(200).json(allConversations)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllerApiFindAllConversations
