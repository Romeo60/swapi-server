import { gql} from 'apollo-server'
import { IResolvers } from '@graphql-tools/utils'
import { makeExecutableSchema } from '@graphql-tools/schema'
import fetch from 'node-fetch'

const typeDefs = gql`

  type Planet {
    name: String
  }
  type Person {
    name: String 
    height: String 
    mass: String    
    gender: String
    homeworld: Planet
  }
  type Individual {
    count: Int
    results: [ Person ]
  }
  type List {
    next: String
    previous: String
    results: [Person]
  }
  type Query {
    people(page:Int!) : List
    person(search: String!): Individual
  }
  
`

const resolvers: IResolvers = {
  Person :{
    homeworld : async parent =>{
      const res = await fetch(parent.homeworld)
      return res.json()
    }
  },
  Query: {
    people(_, { page }, { dataSources }) {
      return dataSources.StarWarsAPI.people(page)
    },
    person(_, { search }, { dataSources }) {
      return dataSources.StarWarsAPI.person(search)
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})