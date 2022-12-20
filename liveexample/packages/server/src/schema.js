const schema = `

type Query {
  allposts: [Post]
  users: [User]
  drafts: [Post]
  posts: [Post]
  }
  type Mutation {
    createDraft(data: PostInput): Post
    publish(draftId: Int): String
    deletePost(postId: Int): String
    addComment(comment: CommentInput): Comment
  }
  type Subscription {
    commentAdded: Comment
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
    authorId: Int
    author: User
    comments: [Comment]
  }

  type Comment {
    authorId: Int
    postId: Int
    content: String
  }

  input CommentInput{
    authorId: Int
    postId: Int
    content: String
  }

  input PostInput {
    title: String
    content: String
    authorId: Int
  } 
`

export { schema }
