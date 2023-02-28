import prisma from './src/controllers/_helpers/prisma.js'

const test = async () => {
  // /api/users?category=Writing&role=Dog writer&age[gte]=20&age[lte]=30
  const results = await prisma.user.findMany({
    where: {
      categories: {
        some: {
          name: 'Writing'
        }
      },
      roles: {
        some: {
          name: 'Dog writer'
        }
      },
      [filterBy]: {
        gte: smallestNum,
        lte: largestNum
      }
      // age: {
      //   gte: 20,
      //   lte: 30
      // },
      // experience: {
      //   gte: 1,
      //   lte: 5
      // },
      // price: {
      //   gte: 500,
      //   lte: 1000
      // }
    },
    include: {
      categories: true,
      roles: true
    }
  })

  console.log(results)
}

test()
