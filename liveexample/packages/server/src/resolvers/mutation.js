const mutation = {
  createDraft: (_parent, { data }, ctx) => {
    try {
      console.log(data)
      return ctx.prisma.post.create({
        data: {
          title: data.title,
          content: data.content,
          authorId: data.authorId
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  publish: (_parent, { draftId }, ctx) => {
    try {
      ctx.prisma.post.update({
        where: {
          id: draftId
        },
        data: {
          published: true
        }
      })
      return 'Post published'
    } catch (e) {
      console.error(e)
    }
  },
  deletePost: async (_parent, { postId }, ctx) => {
    const id = parseInt(postId)
    try {
      await ctx.prisma.Post.delete({
        where: {
          id
        }
      })
      return `The post with id: ${id} was successfully deleted`
    } catch (e) {
      console.error(e)
    }
  },
  addComment: async (_parent, { comment }, ctx) => {
    const pubsub = ctx.pubsub
    const prisma = ctx.prisma
    const addComment = comment
    try {
      const comment = await prisma.comment.create({
        data: addComment
      })
      await pubsub.publish({
        topic: 'COMMENT_ADDED',
        payload: {
          commentAdded: comment
        }
      })
      return await comment
    } catch (e) {
      console.error()
    }
  }
}

const subscription = {
  commentAdded: {
    subscribe: async (root, args, { pubsub }) =>
      await pubsub.subscribe('COMMENT_ADDED')
  }
}

export { mutation, subscription }
// Have to do subscription to post and schema to work with the sub in helloworld view