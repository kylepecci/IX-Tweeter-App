
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI })

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development"
})

export default client