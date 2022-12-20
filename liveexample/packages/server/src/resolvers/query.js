const query = {
  allposts: async (_parent, args, ctx) => {
    return ctx.prisma.post.findMany({})
  },
  posts: async (_parent, args, ctx) => {
    return ctx.prisma.post.findMany({
      where: {
        published: true
      }
    })
  },
  drafts: async (_parent, args, ctx) => {
    return ctx.prisma.post.findMany({
      where: {
        published: false
      }
    })
  },
  users: async (_parent, args, ctx) => {
    return ctx.prisma.user.findMany({})
  }
}

export { query }
