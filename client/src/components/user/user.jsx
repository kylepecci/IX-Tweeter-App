import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const USERNAME = gql`
  query {
    me {
      username
    }
  }
`

class Feed extends React.Component {
  render() {
    return (
      <div>
        <Query query={USERNAME}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return (
                <img
                  src={require("../Feed/ajax-loader.gif")}
                  alt="Loading..."
                />
              )
            }

            if (error) {
              return "oops, somehing blew up."
            }

            return (
              <div className="container">
                <CreateTweet refetchFeed={refetch} />
                <div className="tweets">
                  {/* <UserBox className="info" /> */}

                  {data.me.map(tweet => {
                    return <p>{tweet.username}</p>
                  })}
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Feed
