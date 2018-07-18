import * as React from "react"
import "./newTweet.css"

class Tweet extends React.Component {
  constructor(props) {
    super(props)
    this.state = { wasClicked: false }
    this.handleExpansion = this.handleExpansion.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleLink = this.handleLink.bind(this)
  }

  handleExpansion() {
    this.setState({ wasClicked: true })
  }

  handleExit() {
    this.setState({ wasClicked: false })
  }

  handleLink() {
    this.props.history.push(`/${this.props.author.username}`)
  }

  render() {
    if (this.state.wasClicked) {
      return (
        <div className="bckgrnExpanded">
          <div className="showTweetExpanded">
            <button className="exitBtn" onClick={this.handleExit}>
              X
            </button>
            <div className="tweet-author-expanded" onClick={this.handleLink}>
              <img
                src={require("./userIcon.png")}
                className="userIconExpanded"
              />
              {this.props.author.name}
            </div>
            <div className="textExpanded">{this.props.text}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="showTweet" onClick={this.handleExpansion}>
          <div className="tweet-author">
            <img src={require("./userIcon.png")} className="userIcon" />
            {this.props.author.name}
          </div>
          <div className="text">{this.props.text}</div>
        </div>
      )
    }
  }
}

export default Tweet
