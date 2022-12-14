'use strict'

import Fastify from 'fastify'
import Mercurius from 'mercurius'

import { schema } from './schema.js'
import { resolvers } from './resolvers/index.js'

const { fastify } = Fastify
const { mercurius } = Mercurius

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = fastify()


app.register(mercurius, {
  schema,
  resolvers,
  context: (request, reply) => {
    return { prisma }
  },
  graphiql: true
})

app.get('/hello', async function (req, reply) {
  reply.send({
    "hello":"world"
  })
})

app.listen({ port: 3000 }, console.log("started"))