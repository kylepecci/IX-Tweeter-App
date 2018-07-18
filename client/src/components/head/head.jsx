import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import "./head.css"

const USERNAME = gql`
  query {
    me {
      username
    }
  }
`

class Head extends React.Component {
  state = {
    search: ""
  }

  handleHome = () => {
    this.props.history.push("/?")
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.props.history.push("/login")
  }

  handleLogin = () => {
    this.props.history.push("/login")
  }

  handleMyProfile = () => {
    this.props.history.push("/myprofile")
  }

  handleSearch = () => {
    this.props.history.push(`/${this.state.search}`)
  }

  handleSignup = () => {
    this.props.history.push("/signup")
  }

  handleSettings = () => {
    this.props.history.push("/settings")
  }

  render() {
    const isLoggedIn = localStorage.getItem("token")
    return (
      <div className="head">
        <div>
          <img
            className="bird"
            src={require("./twitter-bird.png")}
            alt="twitter-bird"
          />
          <h1 className="twit">Tweeter</h1>
        </div>
        {isLoggedIn && (
          <Query query={USERNAME}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return ""
              }

              if (error) {
                return "oops"
              }
              return <p className="user"> Hello {data.me.username}!</p>
            }}
          </Query>
        )}
        <form className="searchForm">
          <input
            className="searchBox"
            placeholder="Search for users"
            onChange={e => this.setState({ search: e.target.value })}
          />
          <button
            className="searchBtn"
            type="submit"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </form>
        <div className="nav">
          <img
            className="navBtn"
            src={require("./house-outline.png")}
            alt="home"
            onClick={this.handleHome}
          />
          <img
            className="navBtn"
            src={require("./user.png")}
            alt="profile"
            onClick={this.handleMyProfile}
          />

          {isLoggedIn && (
            <img
              className="navBtn"
              src={require("./exit.png")}
              alt="logout"
              onClick={this.handleLogout}
            />
          )}
          {!isLoggedIn && (
            <img
              className="navBtn"
              src={require("./login.png")}
              alt="logout"
              onClick={this.handleLogin}
            />
          )}
          {isLoggedIn && (
            <img
              className="navBtn"
              src={require("./settings.png")}
              alt="settings"
              onClick={this.handleSettings}
            />
          )}
          {!isLoggedIn && (
            <img
              className="navBtn"
              src={require("./signup.png")}
              alt="signup"
              onClick={this.handleSignup}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Head
