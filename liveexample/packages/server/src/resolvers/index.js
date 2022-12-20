import { query } from './query.js'
import { mutation, subscription } from './mutation.js'
const resolvers = {
  Query: query,
  User: {
    posts: async (_parent, args, ctx) => {
      return ctx.prisma.post.findMany({
        where: {
          authorId: _parent.id
        }
      })
    }
  },
  Post: {
    author: async (_parent, args, ctx) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: _parent.authorId
        }
      })
    },
    comments: async (_parent, args, ctx) => {
      return await ctx.prisma.comment.findMany({
        where: {
          postId: _parent.id
        }
      })
    }
  },
  Mutation: mutation,
  Subscription: subscription
}

export {
  resolvers
}
