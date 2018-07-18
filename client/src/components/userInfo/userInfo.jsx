import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const USER = gql`
  query {
    me {
      username
    }
  }
`

class UserBox extends React.Component {
  render() {
    return (
      <div className="bckgrnd">
        <Query query={USER}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              //   return <img src={require("./ajax-loader.gif")} alt="Loading..." />
              return "loading..."
            }

            if (error) {
              return "oops, somehing blew up."
            }

            return (
              <div className="container">
                {data.me.map(info => {
                  return <h1> {info.username} </h1>
                })}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default UserBox
