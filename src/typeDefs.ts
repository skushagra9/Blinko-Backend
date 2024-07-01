const { gql } = require('apollo-server-express');

export const typeDefs = gql`
  enum CasinoGamePlinkoRiskEnum {
    LOW
    MEDIUM
    HIGH
  }

  type User {
    id: ID!
    name: String!
    address: String!
  }

  type CasinoBet {
    id: ID!
    active: Boolean!
    payoutMultiplier: Float!
    amount: Float!
    payout: Float
    updatedAt: String!
    game: String!
    user: User!
  }

  type CasinoGamePlinko {
    risk: CasinoGamePlinkoRiskEnum!
    point: Float
    path: [Float]
  }

  type PlinkoBetResult {
    id: ID!
    active: Boolean!
    payoutMultiplier: Float!
    amount: Float!
    payout: Float
    updatedAt: String!
    game: String!
    user: User!
    state: CasinoGamePlinko
  }

  type Query {
    hello: String
  }

  type Mutation {
    plinkoBet(
      amount: Float!
      risk: CasinoGamePlinkoRiskEnum!
      address: String!
    ): PlinkoBetResult!
  }
  
  
type User {
  id: ID!
  address: String!
}

type Mutation {
  connectWallet(address: String!): String!
}

type Query {
  hello: String
}

`;
