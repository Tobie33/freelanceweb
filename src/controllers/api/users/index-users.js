import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllerApiFindAllWorkers = async (req, res) => {
  try {
    const allWorkers = await prisma.user.findMany()
    return res.status(200).json(allWorkers)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllerApiFindAllWorkers
