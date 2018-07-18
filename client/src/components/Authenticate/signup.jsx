import * as React from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Head from "../head/head"

const SIGNUP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $name: String!
    $username: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      username: $username
    ) {
      token
      user {
        id
        name
        email
        username
      }
    }
  }
`

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    username: ""
  }

  render() {
    return (
      <div>
        <Head history={this.props.history} />
        <Mutation mutation={SIGNUP}>
          {signup => {
            return (
              <div className="signUpForm">
                <form
                  className="form"
                  onSubmit={async e => {
                    e.preventDefault()
                    try {
                      const { data } = await signup({
                        variables: {
                          email: this.state.email,
                          password: this.state.password,
                          name: this.state.name,
                          username: this.state.username
                        }
                      })
                      localStorage.setItem("email", this.state.email)
                      localStorage.setItem("token", data.signup.token)
                      localStorage.setItem(
                        "user",
                        JSON.stringify(data.signup.user)
                      )
                      //fix this/////
                      this.props.history.push("/myprofile")
                    } catch (error) {
                      localStorage.removeItem("token")
                      localStorage.removeItem("user")
                    }
                  }}
                >
                  <div className="form-inside">
                    <input
                      className="input"
                      type="text"
                      placeholder="name"
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                    <input
                      className="input"
                      type="text"
                      placeholder="email"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <input
                      className="input"
                      type="text"
                      placeholder="username"
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                    />
                    <input
                      className="input"
                      type="password"
                      placeholder="password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <button className="btn" type="submit">
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default SignUp
