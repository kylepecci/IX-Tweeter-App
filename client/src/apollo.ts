import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ``
    }
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development"
})

export default client
