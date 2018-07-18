import * as React from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Head from "../head/head"
import "./login.css"

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  }

  render() {
    return (
      <div>
        <Head history={this.props.history} />
        <Mutation mutation={LOGIN}>
          {login => {
            return (
              <div className="loginForm">
                <form
                  className="form"
                  onSubmit={async e => {
                    e.preventDefault()
                    try {
                      localStorage.setItem("email", this.state.email)
                      const { data } = await login({
                        variables: {
                          email: this.state.email,
                          password: this.state.password
                        }
                      })
                      localStorage.setItem("token", data.login.token)
                      localStorage.setItem(
                        "user",
                        JSON.stringify(data.login.user)
                      )
                      this.props.history.push("/myprofile")
                    } catch (error) {
                      localStorage.removeItem("token")
                      localStorage.removeItem("user")
                      localStorage.removeItem("email")
                    }
                  }}
                >
                  <div className="form-inside">
                    <input
                      className="input"
                      type="text"
                      placeholder="email"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />

                    <button type="submit" className="btn">
                      Log In!
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

export default LoginPage
