'use strict'

import Fastify from 'fastify'
import cors from '@fastify/cors'
import Mercurius from 'mercurius'
import { PrismaClient } from '@prisma/client'

import { schema } from './schema.js'
import { resolvers } from './resolvers/index.js'

const { fastify } = Fastify
const { mercurius } = Mercurius
const prisma = new PrismaClient()

const app = fastify()
app.register(mercurius, {
  schema,
  resolvers,
  context: (request, reply) => {
    return { prisma }
  },
  subscription: true,
  graphiql: true
})

app.register(cors)

app.get('/gql', async function (req, reply) {
  console.log(reply.graphql(req.query))
  return reply.graphql(req.query)
})

app.listen({ port: 3000 }, console.log('http://localhost:3000/graphiql'))
