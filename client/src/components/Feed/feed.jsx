import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import CreateTweet from "../makeTweet/tweet"
import Tweet from "../tweet/newTweet"
import "./feed.css"

const GET_TWEETS = gql`
  query {
    feed(orderBy: "createdAt_DESC") {
      author {
        name
        username
      }
      text
    }
  }
`

class Feed extends React.Component {
  render() {
    return (
      <div>
        <Query query={GET_TWEETS}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return <img src={require("./ajax-loader.gif")} alt="Loading..." />
            }

            if (error) {
              return "oops, somehing blew up."
            }

            return (
              <div className="container">
                <CreateTweet refetchFeed={refetch} />
                <div className="tweets">
                  {/* <UserBox className="info" /> */}

                  {data.feed.map(tweet => {
                    return (
                      <Tweet
                        key={this.props.id}
                        text={tweet.text}
                        author={tweet.author}
                        history={this.props.history}
                      />
                    )
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
