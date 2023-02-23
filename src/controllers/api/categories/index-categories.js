import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllerApiFindAllCats = async (req, res) => {
  try {
    const allCats = await prisma.category.findMany({
      include: {
        roles: true
      }
    })
    return res.status(200).json(allCats)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllerApiFindAllCats
