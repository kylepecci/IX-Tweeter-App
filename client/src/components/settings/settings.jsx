import * as React from "react"
// import logo from "./logo.svg"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Head from "../head/head"
import "./settings.css"

const UPDATE = gql`
  mutation newUsername($email: String!, $username: String!) {
    addUserName(email: $email, username: $username) {
      username
    }
  }
`

class Settings extends React.Component {
  state = {
    username: ""
  }

  render() {
    return (
      <div>
        <Head history={this.props.history} />
        <Mutation mutation={UPDATE}>
          {addUserName => {
            return (
              <div className="form">
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    try {
                      const { data } = await addUserName({
                        variables: {
                          email: localStorage.getItem("email"),
                          username: this.state.username
                        }
                      })
                    } catch (error) {
                      console.log("ERROR")
                    }
                  }}
                >
                  <input
                    className="setInput"
                    type="text"
                    placeholder="Enter new name then hit refresh "
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                  <button className="subBtn" type="submit">
                    Change Username
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

export default Settings
