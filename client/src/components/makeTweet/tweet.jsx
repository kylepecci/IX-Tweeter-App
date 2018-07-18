import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { Query } from "react-apollo"
import "./makeTweet.css"
import * as React from "react"

const MAKE_TWEET = gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      text
    }
  }
`

const USERNAME = gql`
  query {
    me {
      username
    }
  }
`

class CreateTweet extends React.Component {
  render() {
    let input

    return (
      <div>
        <Mutation mutation={MAKE_TWEET}>
          {(createTweet, { text, author }) => {
            return (
              <div className="bckgrndBox">
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    await createTweet({
                      variables: {
                        text: input.value
                      }
                    })
                    this.props.refetchFeed()
                    input.value = ""
                  }}
                >
                  <input
                    className="newTweetBox"
                    placeholder="Post a Tweet"
                    ref={node => {
                      input = node
                    }}
                  />
                  <button className="postBtn" type="submit">
                    Post
                  </button>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}
export default CreateTweet
