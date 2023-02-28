import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllerApiFindAllUsers = async (req, res) => {
  try {
    const category = req.query.category || ''
    const role = req.query.role || ''
    const filterBy = req.query.filterBy || ''
    const smallNum = Number(req.query.smallNum) || ''
    const largeNum = Number(req.query.largeNum) || ''

    const where = {
      lookingForWork: true
    }

    if (category) {
      where.categories = {
        some: {
          categoryName: category
        }
      }
    }

    if (role) {
      where.roles = {
        some: {
          roleName: role
        }
      }
    }

    if (filterBy) {
      where[filterBy] = {}

      if (smallNum) {
        where[filterBy].gte = smallNum
      }

      if (largeNum) {
        where[filterBy].lte = largeNum
      }
    }

    const allUsers = await prisma.user.findMany({
      include: {
        roles: true,
        categories: true
      },
      where
    })
    return res.status(200).json(allUsers)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllerApiFindAllUsers
