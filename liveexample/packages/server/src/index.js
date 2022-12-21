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

app.register(cors, {
  origin: (origin, cb) => {
    const hostname = new URL(origin).hostname
    const authorizedList = ['localhost', '192.168.0.5']
    console.log(hostname)
    if (authorizedList.includes(hostname)) {
      //  Request from localhost will pass
      cb(null, true)
      return
    }
    // Generate an error on other origins, disabling access
    cb(new Error('Not allowed'), false)
  }
})

app.register(mercurius, {
  schema,
  resolvers,
  context: (request, reply) => {
    return { prisma }
  },
  subscription: true,
  graphiql: true
})

app.get('/test', async function (req, reply) {
  return { hello: 'world' }
})

app.listen({ port: 8000 }, console.log('http://localhost:8000/graphiql'))
