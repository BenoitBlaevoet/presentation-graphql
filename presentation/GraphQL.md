# **GraphQL**

## **Qu'est ce que graphQL**

GraphQL est un langage de requête et de manipulation de données pour les API, développé par Facebook en 2012. Il s'agit d'une alternative au protocole REST traditionnel, qui permet aux développeurs de définir explicitement les données dont ils ont besoin dans une requête, plutôt que de devoir faire plusieurs requêtes REST pour obtenir les données nécessaires à leur application.

GraphQL offre de nombreux avantages par rapport à REST, notamment la possibilité de faire des requêtes plus efficaces en ne récupérant que les données dont on a besoin, plutôt que d'avoir à faire des requêtes séparées pour chaque élément de données. Cela peut aider à réduire les temps de chargement des pages et améliorer l'expérience utilisateur.

En outre, GraphQL permet aux développeurs de travailler avec des données structurées de manière plus précise et de manipuler ces données de manière plus flexible. Cela peut aider à accélérer le développement d'applications et à faciliter la maintenance et l'évolution des API.

GraphQL est de plus en plus utilisé dans les applications web et mobiles modernes, en particulier pour les applications qui nécessitent un grand nombre de données ou qui doivent traiter ces données de manière complexe. En résumé, GraphQL est un outil puissant pour les développeurs souhaitant créer des API efficaces et flexibles pour leurs applications.

---

## **Exemple d'une requete GraphQL**

Schema déclaration des types

```graphql
const typeDefs = `

  type Poll {
    id: ID
    name: String
    description: String
    created_at: String
    options: [Options]
  }

  type Options {
    id : Int
    name : String
    polls_id : Int
    poll : Poll
  }
  `

```

Déclaration des query & mutation
```Javascript
const Query = {
  polls: async () => await prisma.Polls.findMany({}),
  poll: async (parent, args) => await prisma.Polls.findUnique({
    where: {
      id: Number(args.id)
    }
  }),
  options: async () => await prisma.Options.findMany({})
}

const Poll = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  description: (parent) => parent.description,
  options: (parent, args) => {
    return prisma.Options.findMany({
      where: { polls_id: Number(parent.id) }
    })
  }
}

const Mutation = {
  addPollWithOptions: async (_, { poll }, ctx, info) => {
    try {
      const resPoll = await prisma.polls.create({
        data: {
          name: poll.name,
          description: poll.description,
          options: {
            create: poll.options
          }
        }
      })
      return { poll: resPoll }
    } catch (e) {
      console.log(e)
    }
  }

}

const resolvers = {
  Poll,
  Query,
  Mutation
}

```

---
## **Avantages et inconvenients**

### **Les avantages de GraphQL par rapport aux alternatives incluent :**

Flexibilité : GraphQL permet aux développeurs de définir les données dont ils ont besoin dans une requête, plutôt que d'être limités par les endpoints prédéfinis d'une API REST. Cela peut aider à améliorer l'efficacité des requêtes et à faciliter le développement d'applications qui ont besoin d'un grand nombre de données ou de traitements complexes.

Efficacité : GraphQL permet de réduire les temps de chargement des pages en ne récupérant que les données dont on a besoin, plutôt que d'avoir à faire plusieurs requêtes REST pour obtenir les différentes données nécessaires. Cela peut améliorer l'expérience utilisateur et accélérer les performances de l'application.

Evolutivité : GraphQL offre une flexibilité accrue pour évoluer les API au fil du temps, en permettant aux développeurs de changer les schémas des données sans affecter les clients existants. Cela peut aider à faciliter la maintenance et le développement continu des applications.

### **Cependant, GraphQL a également quelques inconvénients par rapport aux alternatives :**

Apprentissage : GraphQL peut être plus difficile à apprendre pour les développeurs qui ne sont pas familiarisés avec ce type de langage de requête. Cela peut entraîner un temps d'adaptation plus long et des coûts de formation supplémentaires.

Sécurité : GraphQL peut être plus difficile à sécuriser correctement que les alternatives, en particulier si les développeurs ne prennent pas en compte les bonnes pratiques de sécurité lors de la création des schémas et des resolvers. Cela peut augmenter les risques de faille de sécurité dans les applications.

En résumé, GraphQL offre de nombreux avantages pour les applications qui ont besoin de flexibilité et d'efficacité dans la gestion des données, mais il peut présenter des challenges pour l'apprentissage et la sécurité.

## **Ressources\***
### **Articles**
[GraphQL Server Basics: GraphQL Schemas, TypeDefs & Resolvers Explained](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e) - Prisma blog

### **GraphQL Server**
[Apollo Server](https://www.apollographql.com/docs/apollo-server/)  
[Mercurius](https://mercurius.dev/#/)  
[express-graphql](https://github.com/graphql/express-graphql)

### **GraphQL Client**
[Apollo Client](https://www.apollographql.com/docs/react/)  
[Apollo VueJS](https://apollo.vuejs.org/) - ❗ Support for Vue 3 is in progress in [Apollo VueJS v4](https://v4.apollo.vuejs.org/) at the time of writing.  
[urql](https://formidable.com/open-source/urql/)

\*All ressources are about graphQL in javascript ecosystem