const express = require('express');
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();

