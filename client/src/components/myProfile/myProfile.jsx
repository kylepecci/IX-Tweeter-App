import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Head from "../head/head"
import CreateTweet from "../makeTweet/tweet"
import Tweet from "../tweet/newTweet"
import "./myProfile.css"

const GET_TWEETS = gql`
  query getTweets($email: String!) {
    myFeed(orderBy: "createdAt_DESC", email: $email) {
      author {
        name
      }
      text
    }
  }
`

class MyProfile extends React.Component {
  render() {
    return (
      <div>
        <Head history={this.props.history} />
        <div className="profile-page">
          <Query
            variables={{
              email: localStorage.getItem("email")
            }}
            query={GET_TWEETS}
          >
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
                console.log(error)

                return "Oops, something blew up."
              }
              return (
                <div>
                  <CreateTweet refetchFeed={refetch} />
                  <div className="tweets">
                    {data.myFeed.map(tweet => {
                      return (
                        <Tweet
                          key={tweet.id}
                          text={tweet.text}
                          author={tweet.author}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default MyProfile
