const schema = `
  type Mutation {
    createDraft(content: String!, title: String!): Post
    publish(draftId: Int!): Post
  }

  type User {
    id: Int
    email: String
    name: String
    posts: [Post]
  }

  type Post {
    id: Int
    title: String
    content: String
    published: Boolean
    author: User
  }

  type Query {
    allposts: [Post]
    users: [User]
    drafts: [Post]
    posts: [Post]
  }
`

export { schema }