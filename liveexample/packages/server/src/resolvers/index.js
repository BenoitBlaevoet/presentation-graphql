import { query } from './query.js'
const resolvers = {
  Query: query,
  User: {
    posts: async (_parent, args, ctx) => {
      return ctx.prisma.post.findMany({
        where:{
          authorId: _parent.id
        }
      })
    }
  },
  Post: {
    author:async (_parent, args, ctx) => {
      return ctx.prisma.user.findUnique({
        where:{
          id: _parent.authorId
        }
      })
    }
  }
}

export {
  resolvers
}