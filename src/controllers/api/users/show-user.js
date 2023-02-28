import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllerApiFindTweet = async (req, res) => {
  try {
    const { params: { id } } = req
    const requiredUser = await prisma.user.findUnique({
      where: {
        id: Number(id) },
      include: {
        roles: true,
        categories: true
      },
      rejectOnNotFound: true
    })
    return res.status(200).json(requiredUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllerApiFindTweet
