import * as React from "react"
// import logo from "./logo.svg"
import Head from "../head/head"
import Feed from "../Feed/feed"

interface Props {
  history: any
}

class HomePage extends React.Component<Props> {
  render() {
    return (
      <div>
        <Head history={this.props.history} />
        <Feed history={this.props.history} />
      </div>
    )
  }
}

export default HomePage
