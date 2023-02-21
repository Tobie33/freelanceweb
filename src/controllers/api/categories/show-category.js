import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllerApiFindCat = async (req, res) => {
  try {
    const { params: { id } } = req
    const requiredCat = await prisma.category.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        roles: true
      }
    })
    return res.status(200).json(requiredCat)
  } catch (err) {
    return handleErrors(err)
  }
}

export default controllerApiFindCat
