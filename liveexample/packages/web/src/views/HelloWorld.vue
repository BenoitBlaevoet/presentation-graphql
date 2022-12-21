<script setup>
import { ref, onMounted } from 'vue'
import { useQuery, useMutation, useSubscription, gql } from '@urql/vue'

// Wysiwyg html editor
// TODO: not working anymore i have to check why
import * as Quill from 'quill'
function initQuill () {
  const editor = new Quill('#content-editor', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'code-block']
      ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
  })
  console.log(editor)
}

const clearInputs = () => {
  inputContent.value = ''
  document.querySelector('.ql-editor').innerHTML = ''
  inputTitle.value = ''
}
// Init reactive value to pair with input
const inputContent = ref('')
const inputTitle = ref('')

// graphql query
const res = useQuery({
  query: `
    {
      posts {
        id
        title
        content
        author{
          name
        }
      }
    }
  `
})

// Init reactive value that store query result && status
const fetching = ref(res.fetching)
const data = ref(res.data)
const error = ref(res.error)

// GraphQl mutation query
const MUTATION = gql`
  mutation CreateDraft($data: PostInput){
    createDraft(data: $data){
      content
      title
      authorId
    }
  }
`
// Mutation variable
const variables = () => {
  return {
    data: {
      title: inputTitle.value,
      content: inputContent.value,
      authorId: 3
    }
  }
}
// Store the useMutation so we can trigger it later
const { executeMutation: createDraft } = useMutation(MUTATION)

// GraphQL subscription query
const newPosts = gql`
  subscription PostsSub {
    postAdded{
      id
      title
      content
      author{
        name
      }
    }
  }
`
// subscription handler, i don't need it finally
// const handleSubscription = (posts, response) => {
//   console.log(posts)
//   return [response.newPosts, ...posts]
// }

// const Messages = () => {
//   if (!res.data) {
//     console.log('lol')
//   }
// }

useSubscription({ query: newPosts })

onMounted(() => {
  // Dom manipulation, so we wait that everything is initiated
  initQuill()
  const editor = document.querySelector('.ql-editor')
  editor.addEventListener('keyup', (e) => {
    inputContent.value = e.target.innerHTML
  })
})

</script>

<template>
  <h1 class="
    fixed w-full
    ma-auto p-8
    text-center text-5xl font-bold
    bg-indigo-50 text-indigo-500 shadow-md
    border-b-2 border-indigo-200/75"
  > Présentation
    <span
      class="
        bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-rose-300 via-fuchsia-600 to-purple-200
        text-transparent
        bg-clip-text
      "
    > GraphQL</span>
  </h1>
  <div class="flex pt-36">
    <div id="posts" class="w-1/2 ml-20">
      <div v-if="fetching" class="">
        Loading posts...
      </div>
      <div v-else-if="error" class="">
        Oh no... {{ error }}
      </div>
      <div v-else v-for="post in data.posts"
        class="

          m-4
          rounded-md shadow
          bg-indigo-50
        "
        :key="post.id"
      >
        <div>
        <h2 class="bg-indigo-500 py-2 px-4 text-xl font-bold rounded-t-md text-white">{{ post.title }}</h2>
        <p class="px-4 py-2" v-html="post.content"></p>
        <p class="px-4 py-2 text-sm text-black/50">by {{ post.author.name }}</p>
        </div>
      </div>
    </div>
    <div id="addPost"
        class="
        fixed right-0
        bg-indigo-50 m-4 rounded-md
        w-2/5 h-fit
        "
      >
        <h2 class="bg-indigo-500 py-2 px-4 text-xl font-bold rounded-t-md text-white">
          New post
        </h2>
        <div class="px-4 py-2">
          <label for="title" class="block my-2 font-semibold">
            Title:
            <input v-model="inputTitle" type="text" id="title" name="title"
              class="
                block w-full py-2 px-1 my-2
                rounded focus:outline-indigo-200
              "
            >
          </label>
          <label for="content" class="block my-2  font-semibold">
            content:
            <div id="content-editor"
              class="
                block rounded w-full py-2 px-1 my-2 h-40
                bg-white focus:outline-indigo-200
              "
            >
            </div>
          </label>
          <button @click="createDraft(variables()), clearInputs()"
          class="
            rounded my-2
            inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-indigo-600 hover:shadow-lg focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out
          ">Submit</button>
        </div>
      </div>
  </div>
</template>
